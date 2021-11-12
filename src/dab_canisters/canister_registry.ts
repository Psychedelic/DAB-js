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

  const DEFAULT_AGENT = new HttpAgent({ fetch, host: IC_HOST });

export const getCanisterInfo = async (
  { canisterId,
    agent = DEFAULT_AGENT }: GetCanisterInfoParams
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
  { canisterIds,
    agent = DEFAULT_AGENT
  }: GetMultipleCanisterInfoParams): Promise<CanisterMetadata[]> => {
  const principals = canisterIds.map((canisterId) =>
    typeof canisterId === 'string' ? Principal.fromText(canisterId) : canisterId
  );

  const actor = generateActor(agent);
  const result = await actor.get_info(principals);

  if (result.length === 0) return [];

  return result[0];
};
