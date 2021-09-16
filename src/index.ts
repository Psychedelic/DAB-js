import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { NFTCollection, NFTStandards } from './interfaces/nft';
import NFT from './nft';
import EXT from './standards/ext';
import ICPunks from './standards/icpunks';
import { getAllNFTS } from './utils/dab';

export * from './interfaces/nft';
export * from './nft';

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
  user: Principal,
): Promise<NFTCollection[]> => {
  const NFTCollections = await getAllNFTS(agent);
  const result = await Promise.all(
    NFTCollections.map(async (collection) => {
      const NFTActor = getNFTActor(
        collection.principal_id.toString(),
        agent,
        collection.standard
      );
      try {
        const details = await NFTActor.getUserTokens(user);
        return {
          name: collection.name,
          canisterId: collection.principal_id.toString(),
          standard: collection.standard,
          description: collection.description,
          icon: collection.icon,
          tokens: details.map((detail) => ({
            ...detail,
            collection: collection.name,
          })),
        };
      } catch (e) {
        return {
          name: collection.name,
          canisterId: collection.principal_id.toString(),
          standard: collection.standard,
          tokens: [],
        };
      }
    })
  );
  return result.filter((element) => element.tokens.length);
};
