// import type { Principal } from '@dfinity/principal';
// export type AccountIdentifier = string;
// export type AccountIdentifierReturn =
//   | { Ok: AccountIdentifier }
//   | { Err: CommonError };
// export type ApiError =
//   | { ZeroAddress: null }
//   | { InvalidTokenId: null }
//   | { Unauthorized: null }
//   | { Other: null };
// export type Balance = bigint;
// export type BalanceReturn = { Ok: Balance } | { Err: CommonError };
// export type CommonError = { InvalidToken: TokenIdentifier } | { Other: string };
// export type Date = bigint;
// export interface ExtendedMetadataResult {
//   token_id: bigint;
//   metadata_desc: MetadataDesc;
// }
// export type InterfaceId =
//   | { Burn: null }
//   | { Mint: null }
//   | { Approval: null }
//   | { TransactionHistory: null }
//   | { TransferNotification: null };
// export interface LogoResult {
//   data: string;
//   logo_type: string;
// }
// export type Memo = Array<number>;
// export type Metadata =
//   | {
//       fungible: {
//         decimals: number;
//         metadata: [] | [MetadataContainer];
//         name: string;
//         symbol: string;
//       };
//     }
//   | { nonfungible: [] | [MetadataContainer] };
// export type MetadataContainer =
//   | { blob: Array<number> }
//   | { data: Array<MetadataValue> }
//   | { json: string };
// export type MetadataDesc = Array<MetadataPart>;
// export interface MetadataKeyVal {
//   key: string;
//   val: MetadataVal;
// }
// export interface MetadataPart {
//   data: Array<number>;
//   key_val_data: Array<MetadataKeyVal>;
//   purpose: MetadataPurpose;
// }
// export type MetadataPurpose = { Preview: null } | { Rendered: null };
// export type MetadataResult = { Ok: MetadataDesc } | { Err: ApiError };
// export type MetadataReturn = { Ok: Metadata } | { Err: CommonError };
// export type MetadataVal =
//   | { Nat64Content: bigint }
//   | { Nat32Content: number }
//   | { Nat8Content: number }
//   | { NatContent: bigint }
//   | { Nat16Content: number }
//   | { BlobContent: Array<number> }
//   | { TextContent: string };
// export type MetadataValue = [string, Value];
// export type MintReceipt = { Ok: MintReceiptPart } | { Err: ApiError };
// export interface MintReceiptPart {
//   id: bigint;
//   token_id: bigint;
// }
// export interface MintRequest {
//   to: User;
//   metadata: [] | [MetadataContainer];
// }
// export type OwnerResult = { Ok: Principal } | { Err: ApiError };
// export type SubAccount = Array<number>;
// export type TokenIdentifier = string;
// export type TokenIndex = number;
// export interface TokenMetadata {
//   principal: Principal;
//   metadata: Metadata;
//   account_identifier: AccountIdentifier;
//   token_identifier: TokenIdentifier;
// }
// export interface Transaction {
//   date: Date;
//   request: TransferRequest;
//   txid: TransactionId;
// }
// export type TransactionId = bigint;
// export interface TransactionRequest {
//   token: TokenIdentifier;
//   query: TransactionRequestFilter;
// }
// export type TransactionRequestFilter =
//   | { date: [Date, Date] }
//   | { page: [bigint, bigint] }
//   | { txid: TransactionId }
//   | { user: User };
// export interface TransactionResult {
//   fee: bigint;
//   transaction_type: TransactionType;
// }
// export type TransactionType =
//   | {
//       Approve: { to: Principal; token_id: bigint; from: Principal };
//     }
//   | { Burn: { token_id: bigint } }
//   | { Mint: { to: Principal; token_id: bigint } }
//   | { SetApprovalForAll: { to: Principal; from: Principal } }
//   | {
//       Transfer: { to: Principal; token_id: bigint; from: Principal };
//     }
//   | {
//       TransferFrom: {
//         to: Principal;
//         token_id: bigint;
//         from: Principal;
//       };
//     };
// export interface TransferRequest {
//   to: User;
//   token: TokenIdentifier;
//   notify: boolean;
//   from: User;
//   memo: Memo;
//   subaccount: [] | [SubAccount];
//   amount: Balance;
// }
// export type TransferResponse =
//   | { Ok: Balance }
//   | {
//       Err:
//         | { CannotNotify: AccountIdentifier }
//         | { InsufficientBalance: null }
//         | { InvalidToken: TokenIdentifier }
//         | { Rejected: null }
//         | { Unauthorized: AccountIdentifier }
//         | { Other: string };
//     };
// export type TrasactionsResult =
//   | { Ok: Array<Transaction> }
//   | { Err: CommonError };
// export type TxReceipt = { Ok: bigint } | { Err: ApiError };
// export type User = { principal: Principal } | { address: AccountIdentifier };
// export type Value =
//   | { nat: bigint }
//   | { blob: Array<number> }
//   | { nat8: number }
//   | { text: string };
// export interface erc721_token {
//   add: (arg_0: TransferRequest) => Promise<TransactionId>;
//   balanceOf: (arg_0: Principal) => Promise<bigint>;
//   bearer: (arg_0: TokenIdentifier) => Promise<AccountIdentifierReturn>;
//   getAllMetadataForUser: (arg_0: User) => Promise<Array<TokenMetadata>>;
//   getMaxLimit: () => Promise<number>;
//   getMetadata: (arg_0: bigint) => Promise<MetadataResult>;
//   getMetadataForUser: (
//     arg_0: Principal
//   ) => Promise<Array<ExtendedMetadataResult>>;
//   getTokenIdsForUser: (arg_0: Principal) => Promise<Array<bigint>>;
//   logo: () => Promise<LogoResult>;
//   metadata: (arg_0: TokenIdentifier) => Promise<MetadataReturn>;
//   mint: (arg_0: Principal, arg_1: MetadataDesc) => Promise<MintReceipt>;
//   mintNFT: (arg_0: MintRequest) => Promise<TokenIdentifier>;
//   name: () => Promise<string>;
//   ownerOf: (arg_0: bigint) => Promise<OwnerResult>;
//   safeTransferFrom: (
//     arg_0: Principal,
//     arg_1: Principal,
//     arg_2: bigint
//   ) => Promise<TxReceipt>;
//   supply: (arg_0: TokenIdentifier) => Promise<BalanceReturn>;
//   supportedInterfaces: () => Promise<Array<InterfaceId>>;
//   symbol: () => Promise<string>;
//   totalSupply: () => Promise<bigint>;
//   transfer: (arg_0: TransferRequest) => Promise<TransferResponse>;
//   transferFrom: (
//     arg_0: Principal,
//     arg_1: Principal,
//     arg_2: bigint
//   ) => Promise<TxReceipt>;
// }
// export default interface _SERVICE extends erc721_token {}

import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type GenericValue = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'BoolContent' : boolean } |
  { 'Nat8Content' : number } |
  { 'Int64Content' : bigint } |
  { 'IntContent' : bigint } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'Int32Content' : number } |
  { 'Int8Content' : number } |
  { 'FloatContent' : number } |
  { 'Int16Content' : number } |
  { 'BlobContent' : Array<number> } |
  { 'NestedContent' : Vec } |
  { 'Principal' : Principal } |
  { 'TextContent' : string };
export interface InitArgs {
  'cap' : [] | [Principal],
  'logo' : [] | [string],
  'name' : [] | [string],
  'custodians' : [] | [Array<Principal>],
  'symbol' : [] | [string],
}
export interface ManualReply {
  'logo' : [] | [string],
  'name' : [] | [string],
  'created_at' : bigint,
  'upgraded_at' : bigint,
  'custodians' : Array<Principal>,
  'symbol' : [] | [string],
}
export type ManualReply_1 = { 'Ok' : Array<bigint> } |
  { 'Err' : NftError };
export type ManualReply_2 = { 'Ok' : Array<TokenMetadata> } |
  { 'Err' : NftError };
export type ManualReply_3 = { 'Ok' : TokenMetadata } |
  { 'Err' : NftError };
export type NftError = { 'UnauthorizedOperator' : null } |
  { 'SelfTransfer' : null } |
  { 'TokenNotFound' : null } |
  { 'UnauthorizedOwner' : null } |
  { 'SelfApprove' : null } |
  { 'OperatorNotFound' : null } |
  { 'ExistedNFT' : null } |
  { 'OwnerNotFound' : null };
export type Result = { 'Ok' : bigint } |
  { 'Err' : NftError };
export type Result_1 = { 'Ok' : boolean } |
  { 'Err' : NftError };
export type Result_2 = { 'Ok' : [] | [Principal] } |
  { 'Err' : NftError };
export interface Stats {
  'cycles' : bigint,
  'total_transactions' : bigint,
  'total_unique_holders' : bigint,
  'total_supply' : bigint,
}
export type SupportedInterface = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null };
export interface TokenMetadata {
  'transferred_at' : [] | [bigint],
  'transferred_by' : [] | [Principal],
  'owner' : [] | [Principal],
  'operator' : [] | [Principal],
  'approved_at' : [] | [bigint],
  'approved_by' : [] | [Principal],
  'properties' : Array<[string, GenericValue]>,
  'is_burned' : boolean,
  'token_identifier' : bigint,
  'burned_at' : [] | [bigint],
  'burned_by' : [] | [Principal],
  'minted_at' : bigint,
  'minted_by' : Principal,
}
export type Vec = Array<
  [
    string,
    { 'Nat64Content' : bigint } |
      { 'Nat32Content' : number } |
      { 'BoolContent' : boolean } |
      { 'Nat8Content' : number } |
      { 'Int64Content' : bigint } |
      { 'IntContent' : bigint } |
      { 'NatContent' : bigint } |
      { 'Nat16Content' : number } |
      { 'Int32Content' : number } |
      { 'Int8Content' : number } |
      { 'FloatContent' : number } |
      { 'Int16Content' : number } |
      { 'BlobContent' : Array<number> } |
      { 'NestedContent' : Vec } |
      { 'Principal' : Principal } |
      { 'TextContent' : string },
  ]
>;
export default interface _SERVICE {
  'approve' : ActorMethod<[Principal, bigint], Result>,
  'balanceOf' : ActorMethod<[Principal], Result>,
  'burn' : ActorMethod<[bigint], Result>,
  'custodians' : ActorMethod<[], Array<Principal>>,
  'cycles' : ActorMethod<[], bigint>,
  'dfx_info' : ActorMethod<[], string>,
  'dip721_approve' : ActorMethod<[Principal, bigint], Result>,
  'dip721_balance_of' : ActorMethod<[Principal], Result>,
  'dip721_burn' : ActorMethod<[bigint], Result>,
  'dip721_custodians' : ActorMethod<[], Array<Principal>>,
  'dip721_cycles' : ActorMethod<[], bigint>,
  'dip721_is_approved_for_all' : ActorMethod<[Principal, Principal], Result_1>,
  'dip721_logo' : ActorMethod<[], [] | [string]>,
  'dip721_metadata' : ActorMethod<[], ManualReply>,
  'dip721_mint' : ActorMethod<
    [Principal, bigint, Array<[string, GenericValue]>],
    Result,
  >,
  'dip721_name' : ActorMethod<[], [] | [string]>,
  'dip721_operator_of' : ActorMethod<[bigint], Result_2>,
  'dip721_operator_token_identifiers' : ActorMethod<[Principal], ManualReply_1>,
  'dip721_operator_token_metadata' : ActorMethod<[Principal], ManualReply_2>,
  'dip721_owner_of' : ActorMethod<[bigint], Result_2>,
  'dip721_owner_token_identifiers' : ActorMethod<[Principal], ManualReply_1>,
  'dip721_owner_token_metadata' : ActorMethod<[Principal], ManualReply_2>,
  'dip721_set_approval_for_all' : ActorMethod<[Principal, boolean], Result>,
  'dip721_set_custodians' : ActorMethod<[Array<Principal>], undefined>,
  'dip721_set_logo' : ActorMethod<[string], undefined>,
  'dip721_set_name' : ActorMethod<[string], undefined>,
  'dip721_set_symbol' : ActorMethod<[string], undefined>,
  'dip721_stats' : ActorMethod<[], Stats>,
  'dip721_supported_interfaces' : ActorMethod<[], Array<SupportedInterface>>,
  'dip721_symbol' : ActorMethod<[], [] | [string]>,
  'dip721_token_metadata' : ActorMethod<[bigint], ManualReply_3>,
  'dip721_total_supply' : ActorMethod<[], bigint>,
  'dip721_total_transactions' : ActorMethod<[], bigint>,
  'dip721_total_unique_holders' : ActorMethod<[], bigint>,
  'dip721_transfer' : ActorMethod<[Principal, bigint], Result>,
  'dip721_transfer_from' : ActorMethod<[Principal, Principal, bigint], Result>,
  'git_commit_hash' : ActorMethod<[], string>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], Result_1>,
  'logo' : ActorMethod<[], [] | [string]>,
  'metadata' : ActorMethod<[], ManualReply>,
  'mint' : ActorMethod<
    [Principal, bigint, Array<[string, GenericValue]>],
    Result,
  >,
  'name' : ActorMethod<[], [] | [string]>,
  'operatorOf' : ActorMethod<[bigint], Result_2>,
  'operatorTokenIdentifiers' : ActorMethod<[Principal], ManualReply_1>,
  'operatorTokenMetadata' : ActorMethod<[Principal], ManualReply_2>,
  'ownerOf' : ActorMethod<[bigint], Result_2>,
  'ownerTokenIdentifiers' : ActorMethod<[Principal], ManualReply_1>,
  'ownerTokenMetadata' : ActorMethod<[Principal], ManualReply_2>,
  'rust_toolchain_info' : ActorMethod<[], string>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], Result>,
  'setCustodians' : ActorMethod<[Array<Principal>], undefined>,
  'setLogo' : ActorMethod<[string], undefined>,
  'setName' : ActorMethod<[string], undefined>,
  'setSymbol' : ActorMethod<[string], undefined>,
  'stats' : ActorMethod<[], Stats>,
  'supportedInterfaces' : ActorMethod<[], Array<SupportedInterface>>,
  'symbol' : ActorMethod<[], [] | [string]>,
  'tokenMetadata' : ActorMethod<[bigint], ManualReply_3>,
  'totalSupply' : ActorMethod<[], bigint>,
  'totalTransactions' : ActorMethod<[], bigint>,
  'totalUniqueHolders' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], Result>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], Result>,
}
