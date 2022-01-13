/* eslint-disable @typescript-eslint/camelcase */
import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';

import LedgerService from '../interfaces/ledger';
import { Metadata } from '../interfaces/ext';
import {
  Balance,
  BurnParams,
  getDecimalsFromMetadata,
  InternalTokenMethods,
  parseAmountToSend,
  SendParams,
  SendResponse,
} from './methods';
import { BaseMethodsExtendedActor } from '../utils/actorFactory';
import { getAccountId } from '../utils/account';

type BaseLedgerService = BaseMethodsExtendedActor<LedgerService>;

const DECIMALS = 8

const getMetadata = async (
  _actor: ActorSubclass<BaseLedgerService>
): Promise<Metadata> => {
  return {
    fungible: {
      symbol: 'ICP',
      decimals: DECIMALS,
      name: 'ICP'
    },
  };
};

const send = async (
  actor: ActorSubclass<BaseLedgerService>,
  { to, amount, opts }: SendParams
): Promise<SendResponse> => {
    const defaultArgs = {
      fee: BigInt(10000),
      memo: BigInt(0),
    };
    const parsedAmount = parseAmountToSend(amount, DECIMALS);
    const response = await actor._send_dfx({
      to,
      fee: { e8s: opts?.fee || defaultArgs.fee },
      amount: { e8s: parsedAmount },
      memo: opts?.memo ? BigInt(opts.memo) : defaultArgs.memo,
      from_subaccount: [], // For now, using default subaccount to handle ICP
      created_at_time: [],
    });

    return { height: await response.toString() }
};

const getBalance = async (
  actor: ActorSubclass<BaseLedgerService>,
  user: Principal
): Promise<Balance> => {
  const balanceArgs = { account: getAccountId(user) }
  const decimals = getDecimalsFromMetadata(await getMetadata(actor));
  const value = (await actor._account_balance_dfx(balanceArgs)).toString();
  return { value, decimals };
};

const burnXTC = async (
  _actor: ActorSubclass<BaseLedgerService>,
  _params: BurnParams
) => {
  throw new Error('BURN NOT SUPPORTED');
};

const getDecimals = async (actor: ActorSubclass<BaseLedgerService>) => getDecimalsFromMetadata(await getMetadata(actor))


export default {
  send,
  getMetadata,
  getBalance,
  burnXTC,
  getDecimals
} as InternalTokenMethods;
