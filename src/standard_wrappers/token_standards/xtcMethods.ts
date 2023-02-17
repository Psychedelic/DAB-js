/* eslint-disable @typescript-eslint/camelcase */
import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';

import XtcService, { BurnResult } from '../../interfaces/xtc';
import { Metadata } from '../../interfaces/token';
import {
  BalanceResponse,
  BurnParams,
  getDecimalsFromMetadata,
  InternalTokenMethods,
  parseAmountToSend,
  SendParams,
  SendResponse,
} from './methods';
import { BaseMethodsExtendedActor } from '../../utils/actorFactory';

type BaseXtcService = BaseMethodsExtendedActor<XtcService>;

const getMetadata = async (
  actor: ActorSubclass<BaseXtcService>
): Promise<Metadata> => {
  const metadataResult = await actor._getMetadata();
  return {
    fungible: {
      symbol: metadataResult.symbol,
      decimals: metadataResult.decimals,
      name: metadataResult.name,
      logo: metadataResult.logo,
      fee: metadataResult.fee,
      totalSupply: metadataResult.totalSupply,
      owner: metadataResult.owner,
    },
  };
};

const send = async (
  actor: ActorSubclass<BaseXtcService>,
  { to, amount }: SendParams
): Promise<SendResponse> => {
  const transferResult = await actor._transferErc20(
    Principal.fromText(to),
    amount
  );

  if ('Ok' in transferResult)
    return { transactionId: transferResult.Ok.toString() };

  throw new Error(Object.keys(transferResult.Err)[0]);
};

const getBalance = async (
  actor: ActorSubclass<BaseXtcService>,
  user: Principal
): Promise<BalanceResponse> => {
  const decimals = await getDecimals(actor);
  const value = (await actor._balanceOf(user)).toString();
  return { value, decimals };
};

const burnXTC = async (
  actor: ActorSubclass<BaseXtcService>,
  { to, amount }: BurnParams
): Promise<BurnResult> => {
  const decimals = await getDecimals(actor);
  const parsedAmount = parseAmountToSend(amount, decimals);
  return actor._burn({ canister_id: to, amount: parsedAmount });
};

const getDecimals = async (actor: ActorSubclass<BaseXtcService>) =>
  getDecimalsFromMetadata(await getMetadata(actor));

export default {
  send,
  getMetadata,
  getBalance,
  burnXTC,
  getDecimals,
} as InternalTokenMethods;
