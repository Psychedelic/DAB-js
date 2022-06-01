import NFT from './standard_wrappers/nft_standards/default';
import EXT from './standard_wrappers/nft_standards/ext';
import ICPunks from './standard_wrappers/nft_standards/ic_punks';
import Itoka from './standard_wrappers/nft_standards/itoka';

export * from './registries';
export * from './interfaces/nft';
export * from './interfaces/token';
export * as NFTInterfaces from './interfaces/nft';
export * as TokenInterfaces from './interfaces/token';
export { default as standards } from './constants/standards';
