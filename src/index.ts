import NFT from './standard_wrappers/nft_standards/default';
import EXT from './standard_wrappers/nft_standards/ext';
import ICPunks from './standard_wrappers/nft_standards/ic_punks';

export * from './registries';
export *  from './interfaces/nft';
export *  from './interfaces/token';
export * as NFTInterfaces from './interfaces/nft';
export * as TokenInterfaces from './interfaces/token'
export { default as standards } from './constants/standards';
export { Principal as LegacyPrincipal } from '@dfinity/principal';
export { HttpAgent as LegacyHttpAgent } from '@dfinity/agent';
