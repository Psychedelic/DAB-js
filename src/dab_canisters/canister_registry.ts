import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';

import DABRegistry, { CanisterMetadata } from '../interfaces/dab_registry';
import IDL from '../idls/dab_registry.did';
import { Principal } from '@dfinity/principal';

const CANISTER_ID = 'qxtlu-aiaaa-aaaah-aaupq-cai';

type CanisterId = Principal | string;

const generateActor = (agent: HttpAgent): ActorSubclass<DABRegistry> =>
  Actor.createActor<DABRegistry>(IDL, {
    agent,
    canisterId: Principal.fromText(CANISTER_ID),
  });

export const getCanisterInfo = async (
  canisterId: string | Principal,
  agent: HttpAgent
): Promise<CanisterMetadata | undefined> => {
  const principalId =
    typeof canisterId === 'string'
      ? Principal.fromText(canisterId)
      : canisterId;
  const actor = generateActor(agent);
  const result = await actor.get_info([principalId]);
  if (result.length === 0 || result[0].length === 0) return;
  return result[0][0];
};

export const getMultipleCanisterInfo = async (
  canisterIds: CanisterId[],
  agent: HttpAgent
): Promise<CanisterMetadata[]> => {
  const principals = canisterIds.map((canisterId) =>
    typeof canisterId === 'string' ? Principal.fromText(canisterId) : canisterId
  );

  const actor = generateActor(agent);
  const result = await actor.get_info(principals);

  if (result.length === 0) return [];

  return result[0];
};
