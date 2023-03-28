/* eslint-disable @typescript-eslint/camelcase */
import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';

import Drc20Service from '../../interfaces/drc_20';
import { Metadata } from '../../interfaces/token';
import {
  ApproveParams,
  BalanceResponse,
  BurnParams,
  getDecimalsFromMetadata,
  InternalTokenMethods,
  SendParams,
  SendResponse,
} from './methods';
import { BaseMethodsExtendedActor } from '../../utils/actorFactory';

type BaseDrc20Service = BaseMethodsExtendedActor<Drc20Service>;

const getMetadata = async (
  actor: ActorSubclass<BaseDrc20Service>
): Promise<Metadata> => {
  const metadata = await actor._drc20_metadata();
  const symbol = await actor._drc20_symbol();
  const decimals = await actor._drc20_decimals();
  const name = await actor._drc20_name();
  const fee = await actor._drc20_fee();
  const totalSupply = await actor._drc20_totalSupply();

  return {
    fungible: {
      symbol,
      decimals,
      name,
      logo: metadata.find((item) => item?.name === 'logo')?.[0]?.content,
      fee,
      totalSupply,
    },
  };
};

const send = async (
  actor: ActorSubclass<BaseDrc20Service>,
  { to, amount }: SendParams
): Promise<SendResponse> => {
  const transferResult = await actor._drc20_transfer(to, amount, [], [], []);

  if ('ok' in transferResult)
    return { transactionId: transferResult.ok.toString() };

  throw new Error(transferResult.err.message);
};

const getBalance = async (
  actor: ActorSubclass<BaseDrc20Service>,
  user: Principal
): Promise<BalanceResponse> => {
  const decimals = await getDecimals(actor);
  const value = (await actor._drc20_balanceOf(user.toString())).toString();
  return { value, decimals };
};

const burnXTC = async (
  _actor: ActorSubclass<BaseDrc20Service>,
  _params: BurnParams
) => {
  throw new Error('BURN NOT SUPPORTED');
};

const approve = async (
  actor: ActorSubclass<BaseDrc20Service>,
  params: ApproveParams
) => {
  return actor._drc20_approve(
    params.spender.toString(),
    params.amount,
    [],
    [],
    []
  );
};

const getDecimals = async (actor: ActorSubclass<BaseDrc20Service>) =>
  getDecimalsFromMetadata(await getMetadata(actor));

export default {
  send,
  getMetadata,
  getBalance,
  burnXTC,
  getDecimals,
  approve,
} as InternalTokenMethods;
