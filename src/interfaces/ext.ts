/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from "@dfinity/principal";

export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export interface Asset {
  thumbnail: [] | [File];
  name: string;
  payload: File;
}
export type Balance = bigint;
export interface BalanceRequest {
  token: TokenIdentifier;
  user: User;
}
export type BalanceResponse = { ok: Balance } | { err: CommonError__1 };
export type Balance__1 = bigint;
export type CommonError = { InvalidToken: TokenIdentifier } | { Other: string };
export type CommonError__1 =
  | { InvalidToken: TokenIdentifier }
  | { Other: string };
export type Extension = string;
export interface File {
  data: Array<Array<number>>;
  ctype: string;
}
export type HeaderField = [string, string];
export interface HttpRequest {
  url: string;
  method: string;
  body: Array<number>;
  headers: Array<HeaderField>;
}
export interface HttpResponse {
  body: Array<number>;
  headers: Array<HeaderField>;
  streaming_strategy: [] | [HttpStreamingStrategy];
  status_code: number;
}
export interface HttpStreamingCallbackResponse {
  token: [] | [HttpStreamingCallbackToken];
  body: Array<number>;
}
export interface HttpStreamingCallbackToken {
  key: string;
  sha256: [] | [Array<number>];
  index: bigint;
  content_encoding: string;
}
export type HttpStreamingStrategy = {
  Callback: {
    token: HttpStreamingCallbackToken;
    callback: [Principal, string];
  };
};
export interface ListRequest {
  token: TokenIdentifier__1;
  from_subaccount: [] | [SubAccount__1];
  price: [] | [bigint];
}
export interface Listing {
  locked: [] | [Time];
  seller: Principal;
  price: bigint;
}
export type Memo = Array<number>;
export type Metadata =
  | {
      fungible: {
        decimals: number;
        metadata: [] | [Array<number>];
        name: string;
        symbol: string;
      };
    }
  | { nonfungible: { metadata: [] | [Array<number>] } };
export interface MintingRequest {
  to: AccountIdentifier;
  asset: number;
}
export type Result =
  | {
      ok: Array<[TokenIndex, [] | [Listing], [] | [Array<number>]]>;
    }
  | { err: CommonError };
export type Result_1 = { ok: Array<TokenIndex> } | { err: CommonError };
export type Result_2 = { ok: Balance__1 } | { err: CommonError };
export type Result_3 = { ok: null } | { err: CommonError };
export type Result_4 = { ok: Metadata } | { err: CommonError };
export type Result_5 = { ok: AccountIdentifier } | { err: CommonError };
export type Result_6 =
  | { ok: [AccountIdentifier, [] | [Listing]] }
  | { err: CommonError };
export interface Settlement {
  subaccount: SubAccount__1;
  seller: Principal;
  buyer: AccountIdentifier;
  price: bigint;
}
export type SubAccount = Array<number>;
export type SubAccount__1 = Array<number>;
export type Time = bigint;
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface Transaction {
  token: TokenIdentifier__1;
  time: Time;
  seller: Principal;
  buyer: AccountIdentifier;
  price: bigint;
}
export interface TransferRequest {
  to: User;
  token: TokenIdentifier;
  notify: boolean;
  from: User;
  memo: Memo;
  subaccount: [] | [SubAccount];
  amount: Balance;
}
export type TransferResponse =
  | { ok: Balance }
  | {
      err:
        | { CannotNotify: AccountIdentifier__1 }
        | { InsufficientBalance: null }
        | { InvalidToken: TokenIdentifier }
        | { Rejected: null }
        | { Unauthorized: AccountIdentifier__1 }
        | { Other: string };
    };
export type User = { principal: Principal } | { address: AccountIdentifier__1 };
export default interface _SERVICE {
  acceptCycles: () => Promise<undefined>;
  addAsset: (arg_0: Asset) => Promise<bigint>;
  allPayments: () => Promise<Array<[Principal, Array<SubAccount__1>]>>;
  allSettlements: () => Promise<Array<[TokenIndex, Settlement]>>;
  availableCycles: () => Promise<bigint>;
  balance: (arg_0: BalanceRequest) => Promise<BalanceResponse>;
  bearer: (arg_0: TokenIdentifier__1) => Promise<Result_5>;
  clearPayments: (
    arg_0: Principal,
    arg_1: Array<SubAccount__1>
  ) => Promise<undefined>;
  details: (arg_0: TokenIdentifier__1) => Promise<Result_6>;
  extensions: () => Promise<Array<Extension>>;
  getMinter: () => Promise<Principal>;
  getRegistry: () => Promise<Array<[TokenIndex, AccountIdentifier]>>;
  getTokens: () => Promise<Array<[TokenIndex, Metadata]>>;
  http_request: (arg_0: HttpRequest) => Promise<HttpResponse>;
  http_request_streaming_callback: (
    arg_0: HttpStreamingCallbackToken
  ) => Promise<HttpStreamingCallbackResponse>;
  list: (arg_0: ListRequest) => Promise<Result_3>;
  list_bulk: (
    arg_0: Array<[TokenIndex, bigint]>
  ) => Promise<Array<[TokenIndex, bigint]>>;
  listings: () => Promise<Array<[TokenIndex, Listing, Metadata]>>;
  lock: (
    arg_0: TokenIdentifier__1,
    arg_1: bigint,
    arg_2: AccountIdentifier,
    arg_3: SubAccount__1
  ) => Promise<Result_5>;
  metadata: (arg_0: TokenIdentifier__1) => Promise<Result_4>;
  mintNFT: (arg_0: MintingRequest) => Promise<TokenIndex>;
  payments: () => Promise<[] | [Array<SubAccount__1>]>;
  removePayments: (arg_0: Array<SubAccount__1>) => Promise<undefined>;
  setMinter: (arg_0: Principal) => Promise<undefined>;
  settle: (arg_0: TokenIdentifier__1) => Promise<Result_3>;
  settlements: () => Promise<Array<[TokenIndex, AccountIdentifier, bigint]>>;
  stats: () => Promise<
    [bigint, bigint, bigint, bigint, bigint, bigint, bigint]
  >;
  streamAsset: (
    arg_0: bigint,
    arg_1: boolean,
    arg_2: Array<number>
  ) => Promise<undefined>;
  supply: (arg_0: TokenIdentifier__1) => Promise<Result_2>;
  tokens: (arg_0: AccountIdentifier) => Promise<Result_1>;
  tokens_ext: (arg_0: AccountIdentifier) => Promise<Result>;
  transactions: () => Promise<Array<Transaction>>;
  transfer: (arg_0: TransferRequest) => Promise<TransferResponse>;
  transfer_bulk: (
    arg_0: Array<[TokenIndex, AccountIdentifier]>
  ) => Promise<Array<[TokenIndex, AccountIdentifier]>>;
  updateThumb: (arg_0: string, arg_1: File) => Promise<[] | [bigint]>;
}
