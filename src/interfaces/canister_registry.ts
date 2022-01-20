import type { Principal } from '@dfinity/principal';
export type CanisterCategory = { 'NFT' : null } |
  { 'Games' : null } |
  { 'Social' : null } |
  { 'Token' : null } |
  { 'Tools' : null } |
  { 'Service' : null };
export interface CanisterMetadata {
  'thumbnail' : string,
  'name' : string,
  'frontend' : [] | [string],
  'description' : string,
  'details' : Array<[string, DetailValue]>,
}
export type DetailType = bigint | Array<DetailType> | Array<number> | string | true | false | number | Principal

export type DetailValue = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<DetailValue> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type OperationError = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'Unknown' : string } |
  { 'NonExistentCanister' : null };
export type OperationResponse = { 'Ok' : [] | [string] } |
  { 'Err' : OperationError };
export default interface CanisterRegistry {
  'add' : (arg_0: Principal, arg_1: CanisterMetadata) => Promise<
      OperationResponse
    >,
  'get' : (arg_0: Array<Principal>) => Promise<Array<[] | [CanisterMetadata]>>,
  'get_all' : () => Promise<Array<CanisterMetadata>>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: Principal) => Promise<OperationResponse>,
}
