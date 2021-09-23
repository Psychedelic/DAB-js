import type { Principal } from '@dfinity/principal';
export interface CanisterMetadata {
  url: string;
  name: string;
  description: string;
  version: number;
  logo_url: string;
}
export interface InputCanisterMetadata {
  url: string;
  name: string;
  description: string;
  logo_url: string;
}
export default interface _SERVICE {
  add_canister: (
    canisterId: Principal,
    canisterMetadata: InputCanisterMetadata
  ) => Promise<[] | [string]>;
  get_all: () => Promise<Array<CanisterMetadata>>;
  get_info: (
    canisterIds: Array<Principal>
  ) => Promise<Array<[] | [CanisterMetadata]>>;
  name: () => Promise<string>;
}
