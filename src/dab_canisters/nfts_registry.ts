import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import dabInterface, { GetAllResult } from '../interfaces/dab_nfts';
import dabDid from '../idls/dab_nfts.did';
import { NFTStandards, NFTCollection } from '../interfaces/nft';
import EXT from '../nft_standards/ext';
import ICPunks from '../nft_standards/ic_punks';
import NFT from '../nft_standards/default';

const DAB_CANISTER_ID = 'aipdg-waaaa-aaaah-aaq5q-cai';

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

export const getAllNFTS = async (agent: HttpAgent): Promise<GetAllResult> => {
  const dabActor = Actor.createActor<dabInterface>(dabDid, {
    agent,
    canisterId: Principal.fromText(DAB_CANISTER_ID),
  });
  return dabActor.get_all();
};

export const getAllUserNFTs = async (
  agent: HttpAgent,
  user: Principal
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

export default {};
