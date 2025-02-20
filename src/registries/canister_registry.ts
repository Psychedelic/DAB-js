import { HttpAgent, ActorSubclass } from '@dfinity/agent';

import CanisterRegistryInterface from '../interfaces/dab_registries/canister_registry';
import IDL from '../idls/dab_registries/canister_registry.did';
import { IC_HOST } from '../constants';
import Registry from './standard_registry';
import { generateActor } from '../utils/actorFactory';
import { formatMetadata, FormattedMetadata } from '../utils/registry';
import { Principal } from '@dfinity/principal';

const CANISTER_ID = 'curr3-vaaaa-aaaah-abbdq-cai';
const DEFAULT_AGENT = HttpAgent.createSync({ fetch, host: IC_HOST });

interface CanisterMetadata {
  url: string;
  name: string;
  description: string;
  version: number;
  logo_url: string;
  canisterId: string;
}

const formatBackwardsCompatible = (
  metadata?: FormattedMetadata
): Omit<CanisterMetadata, 'canisterId'> | undefined => {
  if (!metadata) {
    return metadata;
  }
  const { thumbnail, name, description, frontend, details } = metadata;
  return {
    url: frontend?.[0] || '',
    name,
    description,
    version: Number(details.version),
    logo_url: thumbnail,
  };
};

export class CanisterRegistry extends Registry {
  constructor(agent?: HttpAgent) {
    super(CANISTER_ID, agent);
    this.actor = generateActor({
      agent: agent || DEFAULT_AGENT,
      canisterId: CANISTER_ID,
      IDL,
    });
  }
  public getAll = async (): Promise<FormattedMetadata[]> => {
    const canistersMetadata = await (
      this.actor as ActorSubclass<CanisterRegistryInterface>
    ).get_all();
    return canistersMetadata.map(formatMetadata);
  };
}

export const getCanisterInfo = async ({
  canisterId,
  agent = DEFAULT_AGENT,
}: {
  canisterId: Principal | string;
  agent?: HttpAgent;
}): Promise<CanisterMetadata | undefined> => {
  const canisterRegistry = new CanisterRegistry(agent);
  const canister = await canisterRegistry.get(
    Principal.from(canisterId).toString()
  );
  const formattedCanister = formatBackwardsCompatible(canister);
  return (
    formattedCanister && {
      ...formattedCanister,
      canisterId: canisterId.toString(),
    }
  );
};

export const getMultipleCanisterInfo = async ({
  canisterIds,
  agent = DEFAULT_AGENT,
}: {
  canisterIds: (string | Principal)[];
  agent?: HttpAgent;
}): Promise<CanisterMetadata[] | undefined> => {
  const canistersMetadata = await Promise.all(
    canisterIds.map((canisterId) => getCanisterInfo({ canisterId, agent }))
  );
  if (canistersMetadata.length === 0) return [];
  return canistersMetadata.filter(
    (canister) => !!canister
  ) as CanisterMetadata[];
};

export const getAll = async (
  agent?: HttpAgent
): Promise<CanisterMetadata[]> => {
  const allCanisters = await new CanisterRegistry(agent).getAll();
  return allCanisters.map(formatBackwardsCompatible) as CanisterMetadata[];
};

export default {
  getCanisterInfo,
  getMultipleCanisterInfo,
  getAll: (agent: HttpAgent) => new CanisterRegistry(agent).getAll,
};
