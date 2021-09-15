import { NFTDetails } from '../nft';
import EXT from '../standards/ext';
import ICPunks from '../standards/icpunks';

export type NFTStandards = typeof EXT | typeof ICPunks;

export interface NFTCollection {
  name: string;
  canisterId: string;
  standard: string;
  tokens: NFTDetails[];
}
