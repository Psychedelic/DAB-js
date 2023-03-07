import { InternalTokenMethods, getDecimalsFromMetadata } from './methods';

import { ActorSubclass } from '@dfinity/agent';
import { BaseMethodsExtendedActor } from '../../utils/actorFactory';
import {
  BalanceResponse,
  BurnParams,
  FungibleMetadata,
  Metadata,
  SendParams,
  SendResponse,
} from '../../interfaces/token';
import ICRC1Service from '../../interfaces/icrc_1';
import { Principal } from '@dfinity/principal';

type BaseICRC1Service = BaseMethodsExtendedActor<ICRC1Service>;

const getMetadata = async (
  actor: ActorSubclass<BaseICRC1Service>
): Promise<Metadata> => {
  const metadataResult = await actor._icrc1_metadata();
  const symbol = await actor._icrc1_symbol();
  const decimals = await actor._icrc1_decimals();
  const name = await actor._icrc1_name();
  const fee = await actor._icrc1_fee();
  const totalSupply = await actor._icrc1_total_supply();
  const mintingAccount = await actor._icrc1_minting_account();

  const logo = metadataResult.find(([name]) => name === 'icrc1:logo')?.[1];
  const owner = !mintingAccount[0]
    ? Principal.anonymous()
    : mintingAccount[0].owner;

  return {
    fungible: {
      symbol,
      decimals,
      name,
      fee,
      totalSupply,
      logo: logo?.['Text'] || '',
      owner,
    },
  };
};

const getBalance = async (
  actor: ActorSubclass<BaseICRC1Service>,
  user: Principal
): Promise<BalanceResponse> => {
  try {
    const balance = await actor._icrc1_balance_of({
      owner: user,
      subaccount: [],
    });
    return { value: balance.toString(), decimals: 8 };
  } catch (e) {
    return {
      value: 'Error',
      decimals: 8,
      error: 'Error while fetching your balance',
    };
  }
};

const send = async (
  actor: ActorSubclass<BaseICRC1Service>,
  { to, amount, opts }: SendParams
): Promise<SendResponse> => {
  const metadata = await getMetadata(actor);
  const { fee = 0.002, decimals = BigInt(8) } =
    (metadata as FungibleMetadata)?.fungible || {};
  const defaultArgs = {
    fee,
    memo: [],
  };

  const response = await actor._icrc1_transfer({
    to: { owner: Principal.fromText(to), subaccount: [] },
    fee: [opts?.fee ? BigInt(opts?.fee) : BigInt(defaultArgs.fee)],
    memo: [opts.memo ? [Number(opts.memo)] : defaultArgs.memo],
    from_subaccount: [],
    created_at_time: [],
    amount,
  });

  return { height: response.toString() };
};

const burnXTC = async (
  _actor: ActorSubclass<BaseICRC1Service>,
  _params: BurnParams
) => {
  throw new Error('BURN NOT SUPPORTED');
};

const getDecimals = async (actor: ActorSubclass<BaseICRC1Service>) =>
  getDecimalsFromMetadata(await getMetadata(actor));

export default {
  getMetadata,
  getBalance,
  send,
  burnXTC,
  getDecimals,
} as InternalTokenMethods;
