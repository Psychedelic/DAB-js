import type { Principal } from '@dfinity/principal';
import RegistryStandard from './registry_standard';
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
export default interface CanisterRegistry extends RegistryStandard {
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
