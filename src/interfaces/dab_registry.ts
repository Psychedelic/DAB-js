import type { Principal } from '@dfinity/principal';
export interface CanisterMetadata {
  idl: [] | [string];
  url: [] | [string];
  description: [] | [string];
  version: number;
  logo_url: [] | [string];
  principal_id: Principal;
  name: string;
}
export default interface _SERVICE {
  add_canister: (
    canisterId: string,
    canisterMetadata: CanisterMetadata
  ) => Promise<undefined>;
  get_info: (canisterId: string) => Promise<[] | [CanisterMetadata]>;
  name: () => Promise<string>;
  set_description: (
    canisterId: string,
    description: string
  ) => Promise<undefined>;
  set_idl: (canisterId: string, idl: string) => Promise<undefined>;
  set_logo: (canisterId: string, logo: string) => Promise<undefined>;
  set_url: (canisterId: string, url: string) => Promise<undefined>;
}
