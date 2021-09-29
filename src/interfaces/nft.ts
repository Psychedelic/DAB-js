import EXT from '../nft_standards/ext';
import ICPunks from '../nft_standards/ic_punks';

export type NFTStandards = typeof EXT | typeof ICPunks;

export interface NFTCollection {
  name: string;
  canisterId: string;
  standard: string;
  tokens: NFTDetails[];
  icon?: string;
  description?: string;
}

export interface NFTDetails {
  index: bigint;
  canister: string;
  id?: string;
  name?: string;
  url: string;
  metadata: any;
  standard: string;
  collection?: string;
}
