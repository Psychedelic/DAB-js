/* eslint-disable @typescript-eslint/camelcase */
import { Principal } from '@dfinity/principal';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import fetch from 'cross-fetch';

import LedgerService from '../../interfaces/ledger';
import { FungibleMetadata, Metadata } from '../../interfaces/token';
import {
  BalanceResponse,
  BurnParams,
  getDecimalsFromMetadata,
  InternalTokenMethods,
  SendParams,
  SendResponse,
} from './methods';
import { BaseMethodsExtendedActor } from '../../utils/actorFactory';
import { getAccountId } from '../../utils/account';
import { validatePrincipalId } from '../../utils/validations';
import { TokenRegistry } from '../../registries';

type BaseLedgerService = BaseMethodsExtendedActor<LedgerService>;

const getMetadata = async (
  _actor: ActorSubclass<BaseLedgerService>
): Promise<Metadata> => {
  const agent = Actor.agentOf(_actor) as HttpAgent;
  const tokenRegistry = new TokenRegistry(agent);
  const token = await tokenRegistry.get(Actor.canisterIdOf(_actor).toString());
  const { fee = 0.0001, decimals = 8 } = token?.details || {};
  const numberFee = Number(fee?.toString?.());
  const numberDecimals = Number(decimals?.toString?.());
  const parsedFee = numberFee * 10 ** numberDecimals;
  return {
    fungible: {
      symbol: (token?.details?.symbol as string) || 'ICP',
      name: (token?.name as string) || 'ICP',
      decimals: numberDecimals,
      fee: parsedFee,
    },
  };
};

const send = async (
  actor: ActorSubclass<BaseLedgerService>,
  { to, amount, opts }: SendParams
): Promise<SendResponse> => {
  const metadata = await getMetadata(actor);
  const { fee = 0.002, decimals = BigInt(8) } =
    (metadata as FungibleMetadata)?.fungible || {};
  const defaultArgs = {
    fee: BigInt((fee as number) * 10 ** parseInt(decimals.toString(), 10)),
    memo: BigInt(0),
  };
  const response = await actor._send_dfx({
    to: validatePrincipalId(to) ? getAccountId(Principal.fromText(to)) : to,
    fee: { e8s: opts?.fee || defaultArgs.fee },
    amount: { e8s: amount },
    memo: opts?.memo ? BigInt(opts.memo) : defaultArgs.memo,
    from_subaccount: [], // For now, using default subaccount to handle ICP
    created_at_time: [],
  });

  return { height: await response.toString() };
};

const getBalance = async (
  actor: ActorSubclass<BaseLedgerService>,
  user: Principal
): Promise<BalanceResponse> => {
  try {
    const account = getAccountId(user);
    const balance = await actor._account_balance_dfx({ account });
    return { value: balance.e8s.toString(), decimals: 8 };
  } catch (e) {
    return {
      value: 'Error',
      decimals: 8,
      error: 'Error while fetching your balance',
    };
  }
};

const burnXTC = async (
  _actor: ActorSubclass<BaseLedgerService>,
  _params: BurnParams
) => {
  throw new Error('BURN NOT SUPPORTED');
};

const getDecimals = async (actor: ActorSubclass<BaseLedgerService>) =>
  getDecimalsFromMetadata(await getMetadata(actor));

export default {
  send,
  getMetadata,
  getBalance,
  burnXTC,
  getDecimals,
} as InternalTokenMethods;
