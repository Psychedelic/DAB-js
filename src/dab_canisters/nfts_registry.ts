import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import dabInterface, {
  DABCollection,
  GetAllResult,
} from '../interfaces/dab_nfts';
import dabDid from '../idls/dab_nfts.did';
import { NFTStandards, NFTCollection } from '../interfaces/nft';
import EXT from '../nft_standards/ext';
import ICPunks from '../nft_standards/ic_punks';
import DepartureLabs from '../nft_standards/departure_labs';
import NFT from '../nft_standards/default';

const DAB_CANISTER_ID = 'aipdg-waaaa-aaaah-aaq5q-cai';

const NFT_STANDARDS: { [key: string]: NFTStandards } = {
  EXT: EXT,
  ICPunks: ICPunks,
  DepartureLabs: DepartureLabs,
};

export const getNFTActor = (
  canisterId: string,
  agent: HttpAgent,
  standard: string
): NFT => {
  if (!(standard in NFT_STANDARDS)) {
    console.error(`Standard ${standard} is not implemented`);
    throw new Error(`standard is not supported: ${standard}`);
  }
  return new NFT_STANDARDS[standard](canisterId, agent);
};

export const getNFTInfo = async (
  nftCanisterId: string,
  agent: HttpAgent
): Promise<DABCollection | undefined> => {
  const dabActor = Actor.createActor<dabInterface>(dabDid, {
    agent,
    canisterId: Principal.fromText(DAB_CANISTER_ID),
  });

  const result = await dabActor.get_canister(nftCanisterId);
  if (result.length == 0) return undefined;

  return result[0];
};

export const getAllNFTS = async (
  agent: HttpAgent
): Promise<DABCollection[]> => {
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
  // REMOVE WHEN COLLECTION IS ADDED TO DAB
  if (
    !NFTCollections.some(
      (c) => c.principal_id.toText() === 'lhq4n-3yaaa-aaaai-qaniq-cai'
    )
  ) {
    NFTCollections.push({
      icon: 'https://storageapi.fleek.co/fleek-team-bucket/principia.png',
      name: 'Principia Mathematica',
      principal_id: Principal.fromText('lhq4n-3yaaa-aaaai-qaniq-cai'),
      description:
        'An Ode to Mathematics, a silent tribute to the greatest minds of all time.',
      standard: 'DepartureLabs',
    });
  }
  const result = await Promise.all(
    NFTCollections.map(async (collection) => {
      try {
        const NFTActor = getNFTActor(
          collection.principal_id.toString(),
          agent,
          collection.standard
        );
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
        console.error(e);
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
