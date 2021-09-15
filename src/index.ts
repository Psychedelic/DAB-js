import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { NFTCollection, NFTStandards } from './interfaces/nft';
import NFT from './nft';
import EXT from './standards/ext';
import ICPunks from './standards/icpunks';
import { getAllNFTS } from './utils/dab';

const NFT_STANDARDS: { [key: string]: NFTStandards } = {
  EXT: EXT,
  ICPunks: ICPunks,
};

export const getNFTActor = (
  canisterId: string,
  agent: HttpAgent,
  standard: string
): NFT => {
  return new NFT_STANDARDS[standard](canisterId, agent);
};

export const getAllUserNFTs = async (
  agent: HttpAgent,
  user: Principal
): Promise<NFTCollection[]> => {
  const NFTCollections = await getAllNFTS(agent);
  const result = await Promise.all(
    NFTCollections.map(async (dab) => {
      const NFTActor = getNFTActor(
        dab.principal_id.toString(),
        agent,
        dab.standard
      );
      try {
        const details = await NFTActor.getUserTokens(user);
        return {
          name: dab.name,
          canisterId: dab.principal_id.toString(),
          standard: dab.standard,
          tokens: details.map((detail) => ({
            ...detail,
            collection: dab.name,
          })),
        };
      } catch (e) {
        return {
          name: dab.name,
          canisterId: dab.principal_id.toString(),
          standard: dab.standard,
          tokens: [],
        };
      }
    })
  );
  return result.filter((element) => element.tokens.length);
};

export * from './interfaces/nft';
export * from './nft';
