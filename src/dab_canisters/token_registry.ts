import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import fetch from 'cross-fetch';

import TokenRegistry, { input_add_token, input_edit_token, operation_response, Token } from '../interfaces/dab_tokens';
import IDL from '../idls/dab_tokens.did';
import { IC_HOST } from '../constants';
import { createTokenActor } from '../token_standards';
import { TOKEN } from '../constants/standards';

const CANISTER_ID = 'qwt65-nyaaa-aaaah-qcl4q-cai';
const TOKEN_ATTR = ['logo',
  'name',
  'description',
  'website',
  'principal_id',
  'standard',
  'total_supply',
  'symbol']

interface GetTokenInfoParams {
  agent: HttpAgent,
  canisterId: string
}

type RemoveTokenInfoParams = GetTokenInfoParams;

interface AddTokenInfoParams {
  agent: HttpAgent,
  tokenInfo: input_add_token
}

interface EditTokenInfoParams {
  agent: HttpAgent,
  tokenInfo: {
    'logo'?: string,
    'name': string,
    'description'?: string,
    'website'?: string,
    'principal_id'?: Principal,
    'standard'?: string,
    'total_supply'?: bigint,
    'symbol'?: string
  }
}

const generateActor = (agent: HttpAgent): ActorSubclass<TokenRegistry> =>
  Actor.createActor<TokenRegistry>(IDL, {
    agent,
    canisterId: Principal.fromText(CANISTER_ID),
  });

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

export const getTokens = ({ agent = DEFAULT_AGENT }): Promise<Token[]> => {
  const dabActor = generateActor(agent);
  return dabActor.get_all();
}

// export const getTokenInfo = ({ agent = DEFAULT_AGENT, canisterId }: GetTokenInfoParams): Promise<Token> => {
//   const dabActor = generateActor(agent);
//   return dabActor.get_token(canisterId);
// }

export const addToken = ({ agent = DEFAULT_AGENT, tokenInfo }: AddTokenInfoParams): Promise<operation_response> => {
  const dabActor = generateActor(agent);
  return dabActor.add(tokenInfo);
}

export const editToken = ({ agent = DEFAULT_AGENT, tokenInfo }: EditTokenInfoParams): Promise<operation_response> => {
  const dabActor = generateActor(agent);
  const normalizedTokenInfo : input_edit_token = {} as input_edit_token;
  for (const attr in TOKEN_ATTR) {
    normalizedTokenInfo[attr] = attr in tokenInfo ? [tokenInfo[attr]] : [];
  }
  return dabActor.edit(normalizedTokenInfo);
}

export const remoteToken = ({agent = DEFAULT_AGENT, canisterId}: RemoveTokenInfoParams): Promise<operation_response> => {
  const dabActor = generateActor(agent);
  return dabActor.remove(canisterId);
}

