import { HttpAgent, ActorSubclass } from '@dfinity/agent';
import fetch from 'cross-fetch';

import TokenRegistryInterface from '../interfaces/dab_registries/token_registry';
import IDL from '../idls/dab_registries/token_registry.did';

import Registry from './standard_registry';
import { generateActor } from '../utils/actorFactory';
import { formatMetadata, FormattedMetadata } from '../utils/registry';

import { IC_HOST } from '../constants';
import { createTokenActor } from '../standard_wrappers/token_standards';
import { TOKEN } from '../constants/standards';
import { Token } from '../interfaces/token';

const CANISTER_ID = 'qwt65-nyaaa-aaaah-qcl4q-cai';

const DEFAULT_AGENT = new HttpAgent({ fetch, host: IC_HOST });

export const TOKEN_STANDARDS = Object.values(TOKEN)

interface GetTokenActorParams {
  canisterId: string,
  standard: string,
  agent: HttpAgent
}

export const getTokenActor = <T = {}>(
  { canisterId,
    agent,
    standard }: GetTokenActorParams
) => {
  if (!(TOKEN_STANDARDS.includes(standard))) {
    console.error(`Standard ${standard} is not implemented`);
    throw new Error(`standard is not supported: ${standard}`);
  }
  return createTokenActor<T>(canisterId, agent, standard)
};

export class TokenRegistry extends Registry {
  constructor(agent?: HttpAgent) {
    super(CANISTER_ID, agent);
    this.actor = generateActor({ agent: agent || DEFAULT_AGENT, canisterId: CANISTER_ID, IDL });
  }
  public getAll = async (): Promise<FormattedMetadata[]> => {
    const tokenCanistersMetadata = await (this.actor as ActorSubclass<TokenRegistryInterface>).get_all();
    return tokenCanistersMetadata.map(formatMetadata);
  }
}

export const getTokens = async (agent = DEFAULT_AGENT): Promise<Token[]> => {
  const tokenRegistry = new TokenRegistry(agent);
  const tokenCanisters = await tokenRegistry.getAll();
  return tokenCanisters.map((token) => ({
    logo: token.thumbnail,
    name: token.name,
    description: token.description,
    website: token.frontend.length ? token.frontend[0] : '',
    principal_id: token.principal_id,
    standard: token.details.standard as string,
    total_supply : [token.details.total_supply as bigint],
    symbol: token.details.symbol as string,
  }));
};

// Exporting an instance to keep backwards compatibility.
export default new TokenRegistry();
