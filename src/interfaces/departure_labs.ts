/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';

export type AccountIdentifier = string;
export type AddressedChunk = [bigint, bigint, CandyValue];
export type AddressedChunkArray = Array<AddressedChunk>;
export interface AuthorizeRequest {
  p: Principal;
  id: string;
  isAuthorized: boolean;
}
export type Balance = bigint;
export interface BalanceRequest {
  token: TokenIdentifier__1;
  user: User;
}
export type BalanceResponse = { ok: Balance } | { err: CommonError__1 };
export type Callback = (arg_0: Message) => Promise<undefined>;
export interface CallbackStatus {
  failedCalls: bigint;
  failedCallsLimit: bigint;
  callback: [] | [Callback];
  noTopupCallLimit: bigint;
  callsSinceLastTopup: bigint;
}
export interface CandyProperty {
  value: CandyValue;
  name: string;
  immutable: boolean;
}
export type CandyValue =
  | { Int: bigint }
  | { Nat: bigint }
  | { Empty: null }
  | { Nat16: number }
  | { Nat32: number }
  | { Nat64: bigint }
  | { Blob: Array<number> }
  | { Bool: boolean }
  | { Int8: number }
  | { Nat8: number }
  | { Text: string }
  | { Bytes: { thawed: Array<number> } | { frozen: Array<number> } }
  | { Int16: number }
  | { Int32: number }
  | { Int64: bigint }
  | { Option: [] | [CandyValue] }
  | { Floats: { thawed: Array<number> } | { frozen: Array<number> } }
  | { Float: number }
  | { Principal: Principal }
  | {
      Array: { thawed: Array<CandyValue> } | { frozen: Array<CandyValue> };
    }
  | { Class: Array<Property> };
export type CandyValue__1 =
  | { Int: bigint }
  | { Nat: bigint }
  | { Empty: null }
  | { Nat16: number }
  | { Nat32: number }
  | { Nat64: bigint }
  | { Blob: Array<number> }
  | { Bool: boolean }
  | { Int8: number }
  | { Nat8: number }
  | { Text: string }
  | { Bytes: { thawed: Array<number> } | { frozen: Array<number> } }
  | { Int16: number }
  | { Int32: number }
  | { Int64: bigint }
  | { Option: [] | [CandyValue] }
  | { Floats: { thawed: Array<number> } | { frozen: Array<number> } }
  | { Float: number }
  | { Principal: Principal }
  | {
      Array: { thawed: Array<CandyValue> } | { frozen: Array<CandyValue> };
    }
  | { Class: Array<Property> };
export interface Chunk {
  data: Array<number>;
  totalPages: bigint;
  nextPage: [] | [bigint];
}
export interface CodeLine {
  order: bigint;
  line: string;
  lineNumber: bigint;
  nftID: [] | [string];
  image: Array<Array<number>>;
  isNFT: boolean;
  sourceImage: bigint;
}
export type CommonError =
  | { InvalidToken: TokenIdentifier__1 }
  | { Other: string };
export type CommonError__1 =
  | { InvalidToken: TokenIdentifier__1 }
  | { Other: string };
export type Contract =
  | {
      ContractAuthorize: { isAuthorized: boolean; user: Principal };
    }
  | { Mint: { id: string; owner: Principal } };
export interface ContractInfo {
  nft_payload_size: bigint;
  memory_size: bigint;
  max_live_size: bigint;
  cycles: bigint;
  availableNFTs: bigint;
  lastTimeAwarded: bigint;
  total_minted: bigint;
  currentFee: bigint;
  heap_size: bigint;
  authorized_users: Array<Principal>;
}
export interface ContractMetadata {
  name: string;
  symbol: string;
}
export type EXTAccountIdentifier = string;
export interface Egg {
  contentType: string;
  owner: [] | [Principal];
  properties: Properties;
  desiredID: [] | [string];
  isPrivate: boolean;
  payload: { StagedData: null } | { Payload: Array<number> };
}
export type Error =
  | { Immutable: null }
  | { NotFound: null }
  | { Unauthorized: null }
  | { Restricted: null }
  | { InvalidRequest: null }
  | { AuthorizedPrincipalLimitReached: bigint };
export type Extension = string;
export type HeaderField = [string, string];
export interface Message {
  topupCallback: TopupCallback;
  createdAt: bigint;
  topupAmount: bigint;
  event: { ContractEvent: Contract } | { TokenEvent: Token };
}
export interface Metadata {
  id: string;
  contentType: string;
  owner: Principal;
  createdAt: bigint;
  properties: Array<Property__1>;
}
export interface MintRequest {
  to: User;
  metadata: [] | [Array<number>];
}
export type PayloadResult = { Complete: Array<number> } | { Chunk: Chunk };
export type Properties = Array<Property>;
export interface Property {
  value: CandyValue;
  name: string;
  immutable: boolean;
}
export interface Property__1 {
  value: Value;
  name: string;
  immutable: boolean;
}
export interface PublicToken {
  id: string;
  contentType: string;
  owner: Principal;
  createdAt: bigint;
  properties: Properties;
  payload: PayloadResult;
}
export interface Query {
  name: string;
  next: Array<Query>;
}
export type QueryMode = { All: null } | { Some: Array<Query> };
export interface QueryRequest {
  id: string;
  mode: QueryMode;
}
export interface Request {
  url: string;
  method: string;
  body: Array<number>;
  headers: Array<HeaderField>;
}
export interface Response {
  body: Array<number>;
  headers: Array<HeaderField>;
  streaming_strategy: [] | [StreamingStrategy];
  status_code: number;
}
export type Result = { ok: Properties } | { err: Error };
export type Result_1 = { ok: null } | { err: Error };
export type Result_10 = { ok: EXTAccountIdentifier } | { err: CommonError };
export type Result_2 = { ok: Metadata } | { err: Error };
export type Result_3 = { ok: Chunk } | { err: Error };
export type Result_4 = { ok: PublicToken } | { err: Error };
export type Result_5 = { ok: boolean } | { err: string };
export type Result_6 = { ok: [bigint, Array<string>] } | { err: string };
export type Result_7 = { ok: Array<string> } | { err: Error };
export type Result_8 = { ok: Principal } | { err: Error };
export type Result_9 = { ok: bigint } | { err: string };
export type StreamingCallback = (
  arg_0: StreamingCallbackToken
) => Promise<StreamingCallbackResponse>;
export interface StreamingCallbackResponse {
  token: [] | [StreamingCallbackToken];
  body: Array<number>;
}
export interface StreamingCallbackToken {
  key: string;
  index: bigint;
  content_encoding: string;
}
export type StreamingStrategy = {
  Callback: {
    token: StreamingCallbackToken;
    callback: StreamingCallback;
  };
};
export type Token =
  | {
      Authorize: {
        id: string;
        isAuthorized: boolean;
        user: Principal;
      };
    }
  | { Transfer: { id: string; to: Principal; from: Principal } };
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export interface Token__1 {
  contentType: string;
  createdAt: bigint;
  properties: Properties;
  isPrivate: boolean;
  payload: Array<Array<number>>;
}
export type TopupCallback = () => Promise<undefined>;
export interface Update {
  mode: UpdateMode;
  name: string;
}
export type UpdateEventCallback = { Set: Callback } | { Remove: null };
export type UpdateMode = { Set: CandyValue } | { Next: Array<Update> };
export interface UpdateRequest {
  id: string;
  update: Array<Update>;
}
export type User = { principal: Principal } | { address: AccountIdentifier };
export type Value =
  | { Int: bigint }
  | { Nat: bigint }
  | { Empty: null }
  | { Bool: boolean }
  | { Text: string }
  | { Float: number }
  | { Principal: Principal }
  | { Class: Array<Property__1> };
export default interface _SERVICE {
  __updateLicense: (arg_0: bigint, arg_1: [] | [string]) => Promise<boolean>;
  addCodeLine: (arg_0: CodeLine) => Promise<boolean>;
  adminClaim: (arg_0: bigint, arg_1: string) => Promise<boolean>;
  adminGiveCycles: (arg_0: string, arg_1: bigint) => Promise<boolean>;
  authorize: (arg_0: AuthorizeRequest) => Promise<Result_1>;
  balance: (arg_0: BalanceRequest) => Promise<BalanceResponse>;
  balanceOf: (arg_0: Principal) => Promise<Array<string>>;
  bearer: (arg_0: TokenIdentifier) => Promise<Result_10>;
  boolToBytes: (arg_0: boolean) => Promise<Array<number>>;
  byteBufferChunksToValueUnstableBufferDataZone: (
    arg_0: Array<Array<number>>
  ) => Promise<AddressedChunkArray>;
  byteBufferDataZoneToBuffer: (
    arg_0: AddressedChunkArray
  ) => Promise<Array<Array<number>>>;
  bytesToBool: (arg_0: Array<number>) => Promise<boolean>;
  bytesToInt: (arg_0: Array<number>) => Promise<bigint>;
  bytesToNat: (arg_0: Array<number>) => Promise<bigint>;
  bytesToNat16: (arg_0: Array<number>) => Promise<number>;
  bytesToNat32: (arg_0: Array<number>) => Promise<number>;
  bytesToNat64: (arg_0: Array<number>) => Promise<bigint>;
  bytesToPrincipal: (arg_0: Array<number>) => Promise<Principal>;
  bytesToText: (arg_0: Array<number>) => Promise<string>;
  changeOwner: (arg_0: string) => Promise<undefined>;
  clear102: () => Promise<boolean>;
  clearCodeLines: () => Promise<boolean>;
  clearNFTs: () => Promise<boolean>;
  cloneValueUnstable: (arg_0: CandyValue__1) => Promise<CandyValue__1>;
  collect_share: (arg_0: string, arg_1: [] | [bigint]) => Promise<Result_9>;
  countAddressedChunksInWorkspace: (
    arg_0: AddressedChunkArray
  ) => Promise<bigint>;
  creditBalanceOf: (arg_0: string) => Promise<[] | [bigint]>;
  cyclesBalanceOf: (arg_0: string) => Promise<[] | [bigint]>;
  destabalizeProperty: (arg_0: CandyProperty) => Promise<CandyProperty>;
  destabalizeValue: (arg_0: CandyValue__1) => Promise<CandyValue__1>;
  destabalizeValueArray: (
    arg_0: Array<CandyValue__1>
  ) => Promise<Array<CandyValue__1>>;
  emptyWorkspace: () => Promise<AddressedChunkArray>;
  extensions: () => Promise<Array<Extension>>;
  fileAddressedChunks: (
    arg_0: AddressedChunkArray,
    arg_1: AddressedChunkArray
  ) => Promise<AddressedChunkArray>;
  flattenAddressedChunkArray: (
    arg_0: AddressedChunkArray
  ) => Promise<Array<number>>;
  forceCodeUpdate: () => Promise<undefined>;
  fromAddressedChunks: (
    arg_0: AddressedChunkArray
  ) => Promise<AddressedChunkArray>;
  getAddressedChunkArraySize: (arg_0: AddressedChunkArray) => Promise<bigint>;
  getAuthorized: (arg_0: string) => Promise<Array<Principal>>;
  getClassProperty: (
    arg_0: CandyValue__1,
    arg_1: string
  ) => Promise<CandyProperty>;
  getCode: () => Promise<string>;
  getCodeLines: () => Promise<Array<CodeLine>>;
  getContractInfo: () => Promise<ContractInfo>;
  getCurrentLog: () => Promise<Array<CandyValue__1>>;
  getDataChunkFromAddressedChunkArray: (
    arg_0: AddressedChunkArray,
    arg_1: bigint,
    arg_2: bigint
  ) => Promise<CandyValue__1>;
  getDataZoneSize: (arg_0: AddressedChunkArray) => Promise<bigint>;
  getDefaultAccountID: () => Promise<string>;
  getEventCallbackStatus: () => Promise<CallbackStatus>;
  getFeeInfo: () => Promise<[bigint, bigint, bigint]>;
  getLogHistory: (arg_0: bigint) => Promise<[Array<CandyValue__1>, bigint]>;
  getMetadata: () => Promise<ContractMetadata>;
  getNFTs: () => Promise<
    Array<[string, [[] | [Principal], Array<Principal>], Token__1]>
  >;
  getOwner: () => Promise<Principal>;
  getTargetAccount: () => Promise<string>;
  getTotalMinted: () => Promise<bigint>;
  getValueSize: (arg_0: CandyValue__1) => Promise<bigint>;
  getValueUnstableSize: (arg_0: CandyValue__1) => Promise<bigint>;
  getWorkspaceChunk: (
    arg_0: AddressedChunkArray,
    arg_1: bigint,
    arg_2: bigint
  ) => Promise<[{ eof: null } | { chunk: null }, AddressedChunkArray]>;
  getWorkspaceChunkSize: (
    arg_0: AddressedChunkArray,
    arg_1: bigint
  ) => Promise<bigint>;
  http_request: (arg_0: Request) => Promise<Response>;
  http_request_streaming_callback: (
    arg_0: StreamingCallbackToken
  ) => Promise<StreamingCallbackResponse>;
  initDataZone: (arg_0: CandyValue__1) => Promise<AddressedChunkArray>;
  initNFTs: (arg_0: ContractMetadata) => Promise<undefined>;
  initWorkspace: (arg_0: bigint) => Promise<AddressedChunkArray>;
  intToBytes: (arg_0: bigint) => Promise<Array<number>>;
  isAuthorized: (arg_0: string, arg_1: Principal) => Promise<boolean>;
  mint: (arg_0: Egg) => Promise<string>;
  mintNFT: (arg_0: MintRequest) => Promise<undefined>;
  nat16ToBytes: (arg_0: number) => Promise<Array<number>>;
  nat32ToBytes: (arg_0: number) => Promise<Array<number>>;
  nat64ToBytes: (arg_0: bigint) => Promise<Array<number>>;
  natToBytes: (arg_0: bigint) => Promise<Array<number>>;
  nftStreamingCallback: (
    arg_0: StreamingCallbackToken
  ) => Promise<StreamingCallbackResponse>;
  ownerOf: (arg_0: string) => Promise<Result_8>;
  owns: () => Promise<Result_7>;
  principalToBytes: (arg_0: Principal) => Promise<Array<number>>;
  queryProperties: (arg_0: QueryRequest) => Promise<Result>;
  redeemAndClaim: (arg_0: [] | [bigint], arg_1: boolean) => Promise<Result_6>;
  restrict: (arg_0: string, arg_1: boolean) => Promise<Result_5>;
  stabalizeProperty: (arg_0: CandyProperty) => Promise<CandyProperty>;
  stabalizeValue: (arg_0: CandyValue__1) => Promise<CandyValue__1>;
  stabalizeValueArray: (
    arg_0: Array<CandyValue__1>
  ) => Promise<Array<CandyValue__1>>;
  stabalizeValueBuffer: (
    arg_0: AddressedChunkArray
  ) => Promise<Array<CandyValue__1>>;
  staticStreamingCallback: (
    arg_0: StreamingCallbackToken
  ) => Promise<StreamingCallbackResponse>;
  submit_kyc: (arg_0: string, arg_1: string) => Promise<Result_5>;
  textToByteBuffer: (arg_0: string) => Promise<Array<number>>;
  textToBytes: (arg_0: string) => Promise<Array<number>>;
  tokenByIndex: (arg_0: string) => Promise<Result_4>;
  tokenChunkByIndex: (arg_0: string, arg_1: bigint) => Promise<Result_3>;
  tokenMetadataByIndex: (arg_0: string) => Promise<Result_2>;
  transfer: (arg_0: Principal, arg_1: string) => Promise<Result_1>;
  unwrapOptionValue: (arg_0: CandyValue__1) => Promise<CandyValue__1>;
  unwrapOptionValueUnstable: (arg_0: CandyValue__1) => Promise<CandyValue__1>;
  updateAramakmeLMCanister: (arg_0: string) => Promise<undefined>;
  updateBaseFee: (arg_0: bigint) => Promise<undefined>;
  updateCandyLMCanister: (arg_0: string) => Promise<undefined>;
  updateContractOwners: (arg_0: Principal, arg_1: boolean) => Promise<Result_1>;
  updateCurrentFee: (arg_0: bigint) => Promise<undefined>;
  updateEventCallback: (arg_0: UpdateEventCallback) => Promise<undefined>;
  updateKYCRequired: (arg_0: boolean) => Promise<undefined>;
  updateKYCServer: (arg_0: string) => Promise<undefined>;
  updateLastTimeAwarded: () => Promise<undefined>;
  updateLedgerProxy: (arg_0: string) => Promise<undefined>;
  updateMinCycles: (arg_0: bigint) => Promise<undefined>;
  updateProperties: (arg_0: UpdateRequest) => Promise<Result>;
  updateTargetAccount: (arg_0: string) => Promise<undefined>;
  valueToBlob: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueToBool: (arg_0: CandyValue__1) => Promise<boolean>;
  valueToBytes: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueToFloat: (arg_0: CandyValue__1) => Promise<number>;
  valueToInt: (arg_0: CandyValue__1) => Promise<bigint>;
  valueToInt16: (arg_0: CandyValue__1) => Promise<number>;
  valueToInt32: (arg_0: CandyValue__1) => Promise<number>;
  valueToInt64: (arg_0: CandyValue__1) => Promise<bigint>;
  valueToInt8: (arg_0: CandyValue__1) => Promise<number>;
  valueToNat: (arg_0: CandyValue__1) => Promise<bigint>;
  valueToNat16: (arg_0: CandyValue__1) => Promise<number>;
  valueToNat32: (arg_0: CandyValue__1) => Promise<number>;
  valueToNat64: (arg_0: CandyValue__1) => Promise<bigint>;
  valueToNat8: (arg_0: CandyValue__1) => Promise<number>;
  valueToText: (arg_0: CandyValue__1) => Promise<string>;
  valueUnstableToBlob: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueUnstableToBool: (arg_0: CandyValue__1) => Promise<boolean>;
  valueUnstableToBytes: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueUnstableToBytesBuffer: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueUnstableToFloat: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToFloatsBuffer: (arg_0: CandyValue__1) => Promise<Array<number>>;
  valueUnstableToInt: (arg_0: CandyValue__1) => Promise<bigint>;
  valueUnstableToInt16: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToInt32: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToInt64: (arg_0: CandyValue__1) => Promise<bigint>;
  valueUnstableToInt8: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToNat: (arg_0: CandyValue__1) => Promise<bigint>;
  valueUnstableToNat16: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToNat32: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToNat64: (arg_0: CandyValue__1) => Promise<bigint>;
  valueUnstableToNat8: (arg_0: CandyValue__1) => Promise<number>;
  valueUnstableToText: (arg_0: CandyValue__1) => Promise<string>;
  wallet_receive: () => Promise<undefined>;
  wallet_withdraw: (arg_0: string, arg_1: bigint) => Promise<boolean>;
  workspaceDeepClone: (
    arg_0: AddressedChunkArray
  ) => Promise<AddressedChunkArray>;
  workspaceToAddressedChunkArray: (
    arg_0: AddressedChunkArray
  ) => Promise<AddressedChunkArray>;
}
