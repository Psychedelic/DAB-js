import { HttpAgent } from '@dfinity/agent';
import NFT from './nft';
import EXT from './standards/ext';

type NFTStandards = typeof EXT;

const NFT_STANDARDS: { [key: string]: NFTStandards } = {
  ext: EXT,
};

export const getNFT = (
  canisterId: string,
  agent: HttpAgent,
  standard: string
): NFT => {
  return new NFT_STANDARDS[standard](canisterId, agent);
};
