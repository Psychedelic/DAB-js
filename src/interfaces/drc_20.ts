import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export type AccountId = Uint8Array | number[];
export type Address = string;
export interface Allowance {
  remaining: bigint;
  spender: AccountId;
}
export type Amount = bigint;
export type Callback = ActorMethod<[TxnRecord], undefined>;
export interface CoinSeconds {
  updateTime: bigint;
  coinSeconds: bigint;
}
export interface DRC20 {
  drc20_allowance: ActorMethod<[Address, Spender], Amount>;
  drc20_approvals: ActorMethod<[Address], Array<Allowance>>;
  drc20_approve: ActorMethod<
    [Spender, Amount, [] | [Nonce], [] | [Sa], [] | [Data]],
    TxnResult
  >;
  drc20_balanceOf: ActorMethod<[Address], Amount>;
  drc20_decimals: ActorMethod<[], number>;
  drc20_dropAccount: ActorMethod<[[] | [Sa]], boolean>;
  drc20_executeTransfer: ActorMethod<
    [Txid, ExecuteType, [] | [To], [] | [Nonce], [] | [Sa], [] | [Data]],
    TxnResult
  >;
  drc20_fee: ActorMethod<[], Amount>;
  drc20_getCoinSeconds: ActorMethod<
    [[] | [Address]],
    [CoinSeconds, [] | [CoinSeconds]]
  >;
  drc20_holdersCount: ActorMethod<[], [bigint, bigint, bigint]>;
  drc20_lockTransfer: ActorMethod<
    [To, Amount, Timeout, [] | [Decider], [] | [Nonce], [] | [Sa], [] | [Data]],
    TxnResult
  >;
  drc20_lockTransferFrom: ActorMethod<
    [
      From,
      To,
      Amount,
      Timeout,
      [] | [Decider],
      [] | [Nonce],
      [] | [Sa],
      [] | [Data]
    ],
    TxnResult
  >;
  drc20_metadata: ActorMethod<[], Array<Metadata>>;
  drc20_name: ActorMethod<[], string>;
  drc20_subscribe: ActorMethod<
    [[Principal, string], Array<MsgType>, [] | [Sa]],
    boolean
  >;
  drc20_subscribed: ActorMethod<[Address], [] | [Subscription]>;
  drc20_symbol: ActorMethod<[], string>;
  drc20_totalSupply: ActorMethod<[], Amount>;
  drc20_transfer: ActorMethod<
    [To, Amount, [] | [Nonce], [] | [Sa], [] | [Data]],
    TxnResult
  >;
  drc20_transferBatch: ActorMethod<
    [Array<To>, Array<Amount>, [] | [Nonce], [] | [Sa], [] | [Data]],
    Array<TxnResult>
  >;
  drc20_transferFrom: ActorMethod<
    [From, To, Amount, [] | [Nonce], [] | [Sa], [] | [Data]],
    TxnResult
  >;
  drc20_txnQuery: ActorMethod<[TxnQueryRequest], TxnQueryResponse>;
  drc20_txnRecord: ActorMethod<[Txid], [] | [TxnRecord]>;
  standard: ActorMethod<[], string>;
}
export type Data = Uint8Array | number[];
export type Decider = string;
export type ExecuteType =
  | { fallback: null }
  | { send: bigint }
  | { sendAll: null };
export type From = string;
export type Gas = { token: bigint } | { cycles: bigint } | { noFee: null };
export interface InitArgs {
  fee: bigint;
  decimals: number;
  metadata: [] | [Array<Metadata>];
  name: [] | [string];
  totalSupply: bigint;
  founder: [] | [Address];
  symbol: [] | [string];
}
export interface Metadata {
  content: string;
  name: string;
}
export type MsgType =
  | { onApprove: null }
  | { onExecute: null }
  | { onTransfer: null }
  | { onLock: null };
export type Nonce = bigint;
export type Operation =
  | { approve: { allowance: bigint } }
  | {
      lockTransfer: {
        locked: bigint;
        expiration: Time;
        decider: AccountId;
      };
    }
  | {
      transfer: {
        action: { burn: null } | { mint: null } | { send: null };
      };
    }
  | { executeTransfer: { fallback: bigint; lockedTxid: Txid } };
export type Sa = Uint8Array | number[];
export type Spender = string;
export type Subaccount = Uint8Array | number[];
export interface Subscription {
  callback: Callback;
  msgTypes: Array<MsgType>;
}
export type Time = bigint;
export type Timeout = number;
export type Timestamp = bigint;
export type To = string;
export interface Transaction {
  to: AccountId;
  value: bigint;
  data: [] | [Uint8Array | number[]];
  from: AccountId;
  operation: Operation;
}
export type Txid = Uint8Array | number[];
export type TxnQueryRequest =
  | { getEvents: { owner: [] | [Address] } }
  | { txnCount: { owner: Address } }
  | { lockedTxns: { owner: Address } }
  | { lastTxids: { owner: Address } }
  | { lastTxidsGlobal: null }
  | { getTxn: { txid: Txid } }
  | { txnCountGlobal: null };
export type TxnQueryResponse =
  | { getEvents: Array<TxnRecord> }
  | { txnCount: bigint }
  | { lockedTxns: { txns: Array<TxnRecord>; lockedBalance: bigint } }
  | { lastTxids: Array<Txid> }
  | { lastTxidsGlobal: Array<Txid> }
  | { getTxn: [] | [TxnRecord] }
  | { txnCountGlobal: bigint };
export interface TxnRecord {
  gas: Gas;
  msgCaller: [] | [Principal];
  transaction: Transaction;
  txid: Txid;
  nonce: bigint;
  timestamp: Time;
  caller: AccountId;
  index: bigint;
}
export type TxnResult =
  | { ok: Txid }
  | {
      err: {
        code:
          | { NonceError: null }
          | { InsufficientGas: null }
          | { InsufficientAllowance: null }
          | { UndefinedError: null }
          | { InsufficientBalance: null }
          | { NoLockedTransfer: null }
          | { DuplicateExecutedTransfer: null }
          | { LockedTransferExpired: null };
        message: string;
      };
    };
export default interface _SERVICE extends DRC20 {}
