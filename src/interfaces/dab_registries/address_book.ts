import type { Principal } from '@dfinity/principal';

export interface AddressMetadata {
  'name': string,
  'description'?: string,
  'emoji'?: string,
  'principal_id': Principal,
}

export type Error = { 'NotAuthorized' : null } |
{ 'BadParameters' : null } |
{ 'Unknown' : string } |
{ 'NonExistentItem' : null };

export type Response = { 'Ok' : [] | [string] } |
  { 'Err' : Error };

export default interface AddressBookInterface {
  'add' : (arg_0: AddressMetadata) => Promise<Response>,
  'get_all' : () => Promise<Array<AddressMetadata>>,
  'name' : () => Promise<string>,
  'remove' : (arg_0: String) => Promise<Response>,
}
