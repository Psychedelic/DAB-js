import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { NFTRegistry, NFTStandards } from './interfaces/nft';
import NFT from './nft';
import EXT from './standards/ext';
import ICPunks from './standards/icpunks';
import { getAllNFTS } from './utils/dab';

const NFT_STANDARDS: { [key: string]: NFTStandards } = {
  ext: EXT,
  icpunks: ICPunks,
};

export interface GetAllUserNFTsResponse {
  [standard: string]: NFTRegistry[];
}

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
): Promise<GetAllUserNFTsResponse> => {
  const NFTRegistry = await getAllNFTS(agent);
  const result = {};
  await Promise.all(
    NFTRegistry.map(async (dab) => {
      const NFTActor = getNFTActor(
        dab.principal_id.toString(),
        agent,
        dab.standard
      );
      const details = await NFTActor.getUserTokens(user);
      if (!(dab.standard in result)) result[dab.standard] = [];
      result[dab.standard].push({
        name: dab.name,
        canisterId: dab.principal_id.toString(),
        tokens: details,
      });
    })
  );
  return result;
};

export * from './interfaces/nft';