import { HttpAgent, ActorSubclass } from '@dfinity/agent';
import fetch from 'cross-fetch';

import CanisterRegistryInterface from '../interfaces/dab_registries/canister_registry';
import IDL from '../idls/dab_registries/canister_registry.did';
import { IC_HOST } from '../constants';
import Registry from './standard_registry';
import { generateActor } from '../utils/actorFactory';
import { formatMetadata, FormattedMetadata } from '../utils/registry';

const CANISTER_ID = 'qxtlu-aiaaa-aaaah-aaupq-cai';

const DEFAULT_AGENT = new HttpAgent({ fetch, host: IC_HOST });

export class CanisterRegistry extends Registry {
  constructor(agent?: HttpAgent) {
    super(CANISTER_ID, agent);
    this.actor = generateActor({ agent: agent || DEFAULT_AGENT, canisterId: CANISTER_ID, IDL });
  }
  public getAll = async (): Promise<FormattedMetadata[]> => {
    const canistersMetadata = await (this.actor as ActorSubclass<CanisterRegistryInterface>).get_all();
    return canistersMetadata.map(formatMetadata);
  }
}

export const getCanisterInfo = async ({
  canisterId,
  agent = DEFAULT_AGENT }: { 
    canisterId: string, 
    agent?: HttpAgent
  }): Promise<FormattedMetadata | undefined> => {
    const canisterRegistry = new CanisterRegistry(agent);
    return canisterRegistry.get(canisterId);
  };

export const getMultipleCanisterInfo = async ({
  canisterIds,
  agent = DEFAULT_AGENT }: { 
    canisterIds: string[], 
    agent?: HttpAgent
  }): Promise<FormattedMetadata[] | undefined>  => {
  const canistersMetadata = await Promise.all(canisterIds.map((canisterId) => getCanisterInfo({ canisterId, agent })));
  if (canistersMetadata.length === 0) return [];
  return canistersMetadata.filter(canister => !!canister) as FormattedMetadata[];
};

// Exporting an instance to keep backwards compatibility.
export default new CanisterRegistry();
