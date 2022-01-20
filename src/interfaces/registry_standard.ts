import type { Principal } from '@dfinity/principal';
export type detail_value = { 'I64' : bigint } |
  { 'U64' : bigint } |
  { 'Vec' : Array<detail_value> } |
  { 'Slice' : Array<number> } |
  { 'Text' : string } |
  { 'True' : null } |
  { 'False' : null } |
  { 'Float' : number } |
  { 'Principal' : Principal };
export type error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'Unknown' : string } |
  { 'NonExistantCanister' : null };
export interface metadata {
  'thumbnail' : string,
  'name' : string,
  'frontend' : [] | [string],
  'description' : string,
  'details' : Array<[string, detail_value]>,
}
export type response = { 'Ok' : [] | [string] } |
  { 'Err' : error };
export default interface RegistryStandard {
  'add' : (arg_0: Principal, arg_1: metadata) => Promise<response>,
  'get' : (arg_0: Principal) => Promise<[] | [metadata]>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: Principal) => Promise<response>,
}
