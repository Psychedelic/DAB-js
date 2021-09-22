import { Agent, Actor, ActorSubclass } from '@dfinity/agent';

import DABRegistry from '../interfaces/dab_registry';
import IDL from '../idls/dab_registry.did';

const CANISTER_ID = '';

const generateActor = (agent: Agent): ActorSubclass<DABRegistry> =>
  Actor.createActor<DABRegistry>(IDL, { agent, canisterId: CANISTER_ID });

export const getName = async (
  canisterId: string,
  agent: Agent
): Promise<string> => {
  const actor = generateActor(agent);
  const result = await actor.get_info(canisterId);
  if (result.length === 0) return '';
  return result[0].name;
};

export const getMultipleNames = async (
  canisterIds: string[],
  agent: Agent
): Promise<string[]> => {
  const result = await Promise.all(
    canisterIds.map((canisterId) => getName(canisterId, agent))
  );

  return result;
};
