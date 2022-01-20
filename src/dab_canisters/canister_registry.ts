import { HttpAgent, ActorSubclass } from '@dfinity/agent';
import fetch from 'cross-fetch';

import CanisterRegistryInterface from '../interfaces/canister_registry';
import IDL from '../idls/canister_registry.did';
import { IC_HOST } from '../constants';
import Registry from './standard_registry';
import { generateActor } from '../utils/actorFactory';
import { Metadata } from '../interfaces/registry_standard';
import { formatRegistryDetails, FormattedMetadata } from '../utils/registry';

const CANISTER_ID = 'qxtlu-aiaaa-aaaah-aaupq-cai';

const DEFAULT_AGENT = new HttpAgent({ fetch, host: IC_HOST });

export class CanisterRegistry extends Registry {
  constructor(agent?: HttpAgent) {
    super(CANISTER_ID, agent);
    this.actor = generateActor({ agent: agent || DEFAULT_AGENT, canisterId: CANISTER_ID, IDL });
  }
  public getAll = async (): Promise<Metadata[]> => (this.actor as ActorSubclass<CanisterRegistryInterface>).get_all();

  public getCanisterInfo = async (canisterId: string): Promise<FormattedMetadata | undefined> => {
    const result = await this.get(canisterId);
    if (result?.length === 0 || result?.[0]?.details?.length === 0) return;
    const { details, ...canisterInfo } = result[0];
    return { details: formatRegistryDetails(details), ...canisterInfo };
  }

  public getMultipleCanisterInfo = async ({ canisterIds }: { canisterIds: string[] }): Promise<FormattedMetadata[]> => {
    const canistersMetadata = await Promise.all(canisterIds.map(this.getCanisterInfo));
    if (canistersMetadata.length === 0) return [];
    return canistersMetadata.filter(canister => !!canister) as FormattedMetadata[];
  };
}

// Exporting an instance to keep backwards compatibility.
export default new CanisterRegistry();
