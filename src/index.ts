import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { NFTCollection, NFTStandards, NFTDetails } from './interfaces/nft';
import NFT from './standard_wrappers/nft_standards/default';
import EXT from './standard_wrappers/nft_standards/ext';
import ICPunks from './standard_wrappers/nft_standards/ic_punks';

export * from './interfaces/nft';
export * from './registries';
export { default as standards } from './constants/standards';
