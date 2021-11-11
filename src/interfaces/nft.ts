import DepartureLabs from '../nft_standards/departure_labs';
import ERC721 from '../nft_standards/erc_721';
import EXT from '../nft_standards/ext';
import ICPunks from '../nft_standards/ic_punks';

export type NFTStandards = typeof EXT | typeof ICPunks | typeof DepartureLabs | typeof ERC721;

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
