import {
  HttpAgent,
  Actor,
  ActorMethod,
  ActorSubclass,
  CreateCertificateOptions,
} from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

type ExtendedActorConstructor = new () => ActorSubclass;

export type BaseMethodsExtendedActor<T> = {
  [K in keyof T as `_${Uncapitalize<string & K>}`]: T[K];
};

export const createExtendedActorClass = (
  agent: HttpAgent,
  methods,
  canisterId: string | Principal,
  IDLFactory: IDL.InterfaceFactory,
  blsVerify?: CreateCertificateOptions['blsVerify']
): ExtendedActorConstructor => {
  class ExtendedActor extends Actor.createActorClass(IDLFactory) {
    constructor() {
      const principalCanisterId =
        typeof canisterId === 'string'
          ? Principal.fromText(canisterId)
          : canisterId;
      super({ agent, canisterId: principalCanisterId, blsVerify });

      Object.keys(this).forEach((methodName) => {
        this[`_${methodName}`] = this[methodName];
      });

      Object.keys(methods).forEach((methodName) => {
        this[methodName] = ((...args: unknown[]) =>
          methods[methodName](this, ...args) as unknown) as ActorMethod;
      });
    }
  }

  return ExtendedActor;
};

export function generateActor<T>({
  agent,
  canisterId,
  IDL,
}: {
  agent: HttpAgent;
  canisterId: string;
  IDL: IDL.InterfaceFactory;
}): ActorSubclass<T> {
  return Actor.createActor<T>(IDL, {
    agent,
    canisterId: Principal.fromText(canisterId),
  });
}

export default { createExtendedActorClass, generateActor };
