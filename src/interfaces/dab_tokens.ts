import type { Principal } from '@dfinity/principal';
export interface input_add_token {
  'logo' : string,
  'name' : string,
  'description' : string,
  'website' : string,
  'principal_id' : Principal,
  'standard' : string,
  'total_supply' : [] | [bigint],
  'symbol' : string,
}
export interface input_edit_token {
  'logo' : [] | [string],
  'name' : string,
  'description' : [] | [string],
  'website' : [] | [string],
  'principal_id' : [] | [Principal],
  'standard' : [] | [string],
  'total_supply' : [] | [bigint],
  'symbol' : [] | [string],
}
export type operation_error = { 'NotAuthorized' : null } |
  { 'BadParameters' : null } |
  { 'NonExistentToken' : null } |
  { 'ParamatersNotPassed' : null };
export type operation_response = { 'Ok' : boolean } |
  { 'Err' : operation_error };
export interface Token {
  'logo' : string,
  'name' : string,
  'description' : string,
  'website' : string,
  'timestamp' : bigint,
  'principal_id' : Principal,
  'standard' : string,
  'total_supply' : [] | [bigint],
  'symbol' : string,
}
export default interface _SERVICE {
  'add' : (arg_0: input_add_token) => Promise<operation_response>,
  'edit' : (arg_0: input_edit_token) => Promise<operation_response>,
  'get_all' : () => Promise<Array<Token>>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: string) => Promise<operation_response>,
  'set_controller' : (arg_0: Principal) => Promise<operation_response>,
}