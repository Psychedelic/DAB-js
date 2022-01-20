import type { Principal } from '@dfinity/principal';
export interface input_nft_canister {
  'icon' : string,
  'name' : string,
  'description' : string,
  'principal_id' : Principal,
  'standard' : string,
}
export interface nft_canister {
  'icon' : string,
  'name' : string,
  'description' : string,
  'timestamp' : bigint,
  'principal_id' : Principal,
  'standard' : string,
}
export type operation_error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'NonExistentCanister' : null } |
  { 'ParamatersNotPassed' : null };
export type operation_response = { 'Ok' : boolean } |
  { 'Err' : operation_error };
export interface _SERVICE {
  'add' : (arg_0: input_nft_canister) => Promise<operation_response>,
  'edit' : (
      arg_0: Principal,
      arg_1: [] | [string],
      arg_2: [] | [string],
      arg_3: [] | [string],
      arg_4: [] | [string],
    ) => Promise<operation_response>,
  'get' : (arg_0: Principal) => Promise<[] | [nft_canister]>,
  'get_all' : () => Promise<Array<nft_canister>>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: Principal) => Promise<operation_response>,
  'set_controller' : (arg_0: Principal) => Promise<operation_response>,
}
