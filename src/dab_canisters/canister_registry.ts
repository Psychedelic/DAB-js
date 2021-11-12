import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';

import DABRegistry, { CanisterMetadata } from '../interfaces/dab_registry';
import IDL from '../idls/dab_registry.did';
import { Principal } from '@dfinity/principal';
import { IC_HOST } from '../constants';

const CANISTER_ID = 'qxtlu-aiaaa-aaaah-aaupq-cai';

type CanisterId = Principal | string;

interface GetCanisterInfoParams {
  canisterId: CanisterId,
  agent?: HttpAgent
}

interface GetMultipleCanisterInfoParams {
  canisterIds: CanisterId[],
  agent?: HttpAgent
}

const generateActor = (agent: HttpAgent): ActorSubclass<DABRegistry> =>
  Actor.createActor<DABRegistry>(IDL, {
    agent,
    canisterId: Principal.fromText(CANISTER_ID),
  });

export const getCanisterInfo = async (
  { canisterId,
    agent }: GetCanisterInfoParams
): Promise<CanisterMetadata | undefined> => {
  const defaultAgent = agent ? agent : new HttpAgent({ fetch, host: IC_HOST });

  const principalId =
    typeof canisterId === 'string'
      ? Principal.fromText(canisterId)
      : canisterId;
  const actor = generateActor(defaultAgent);
  const result = await actor.get_info([principalId]);
  if (result.length === 0 || result[0].length === 0) return;
  return result[0][0];
};

export const getMultipleCanisterInfo = async (
  { canisterIds,
    agent
  }: GetMultipleCanisterInfoParams): Promise<CanisterMetadata[]> => {
  const defaultAgent = agent ? agent : new HttpAgent({ fetch, host: IC_HOST });

  const principals = canisterIds.map((canisterId) =>
    typeof canisterId === 'string' ? Principal.fromText(canisterId) : canisterId
  );

  const actor = generateActor(defaultAgent);
  const result = await actor.get_info(principals);

  if (result.length === 0) return [];

  return result[0];
};
