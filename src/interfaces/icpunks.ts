/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';

export type HeaderField = [string, string];
export type HttpRequest = HttpRequest_2;
export interface HttpRequest_2 {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
};
export type HttpResponse = HttpResponse_2;
export interface HttpResponse_2 {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
};
export interface ICPTs { 'e8s' : bigint };
export type Listing = Listing_2;
export interface Listing_2 {
  'tokenId' : bigint,
  'owner' : Principal,
  'timestamp' : Time,
  'price' : bigint,
};
export type MintRequest = MintRequest_2;
export interface MintRequest_2 {
  'url' : string,
  'dataurl' : string,
  'accountid' : string,
  'contentType' : string,
  'data' : Array<number>,
  'desc' : string,
  'name' : string,
  'properties' : Array<Property>,
};
export type Operation = { 'init' : null } |
  { 'list' : null } |
  { 'mint' : null } |
  { 'delist' : null } |
  { 'transfer' : null } |
  { 'purchase' : null };
export type Operation_3 = Operation;
export interface Property { 'value' : string, 'name' : string };
export interface StorageActor {
  'addRecord' : (
      arg_0: Principal,
      arg_1: Operation_3,
      arg_2: [] | [Principal],
      arg_3: [] | [Principal],
      arg_4: bigint,
      arg_5: [] | [bigint],
      arg_6: Time,
    ) => Promise<bigint>,
};
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
};
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
};
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Time = bigint;
export type TokenDesc = TokenDesc_2;
export interface TokenDesc_2 {
  'id' : bigint,
  'url' : string,
  'owner' : Principal,
  'desc' : string,
  'name' : string,
  'properties' : Array<Property>,
};
export default interface _SERVICE {
  'acceptCycles' : () => Promise<undefined>,
  'add_genesis_record' : () => Promise<bigint>,
  'availableCycles' : () => Promise<bigint>,
  'data_of' : (arg_0: bigint) => Promise<TokenDesc>,
  'delist' : (arg_0: bigint) => Promise<boolean>,
  'disableMint' : () => Promise<boolean>,
  'enableMint' : () => Promise<boolean>,
  'getAccountBalance' : (arg_0: string) => Promise<ICPTs>,
  'getAccountID' : (arg_0: number, arg_1: number) => Promise<string>,
  'getBalance' : () => Promise<ICPTs>,
  'getBunny' : (arg_0: bigint) => Promise<[] | [string]>,
  'getCurrentToken' : () => Promise<bigint>,
  'getPrice' : () => Promise<bigint>,
  'getPunks' : () => Promise<Array<bigint>>,
  'getToken' : (arg_0: string) => Promise<[] | [bigint]>,
  'get_cycles' : () => Promise<bigint>,
  'get_listed' : (arg_0: bigint) => Promise<Array<Listing>>,
  'get_storage_canister' : () => Promise<[] | [StorageActor]>,
  'http_request' : (arg_0: HttpRequest) => Promise<HttpResponse>,
  'individual_holders' : () => Promise<bigint>,
  'list' : (arg_0: bigint, arg_1: bigint) => Promise<boolean>,
  'listSeeds' : () => Promise<Array<[] | [string]>>,
  'manageSeeds' : (arg_0: string) => Promise<boolean>,
  'mint' : (arg_0: MintRequest) => Promise<bigint>,
  'multi_mint' : (arg_0: Array<MintRequest>) => Promise<Array<bigint>>,
  'my_tokens' : () => Promise<Array<bigint>>,
  'name' : () => Promise<string>,
  'nextAccount' : () => Promise<bigint>,
  'owner' : () => Promise<Principal>,
  'owner_of' : (arg_0: bigint) => Promise<Principal>,
  'remainingTokens' : () => Promise<bigint>,
  'setLocal' : () => Promise<boolean>,
  'setPrice' : (arg_0: bigint) => Promise<boolean>,
  'set_ledger_canister_id' : (arg_0: [] | [Principal]) => Promise<boolean>,
  'set_owner' : (arg_0: Principal) => Promise<boolean>,
  'set_storage_canister_id' : (arg_0: [] | [Principal]) => Promise<boolean>,
  'symbol' : () => Promise<string>,
  'tokenAccounts' : (arg_0: string) => Promise<string>,
  'total_supply' : () => Promise<bigint>,
  'transfer_to' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'user_tokens' : (arg_0: Principal) => Promise<Array<bigint>>,
  'wallet_receive' : () => Promise<{ 'accepted' : bigint }>,
};