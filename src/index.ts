import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import NFT, { NFTDetails } from './nft';
import EXT from './standards/ext';
import ICPunks from './standards/icpunks';
import { getAllNFTS } from './utils/dab';

const DAB_RESULT = [
  { standard: 'ext', canisterId: 'some-id', name: 'entrepot' },
];

type NFTStandards = typeof EXT | typeof ICPunks;

const NFT_STANDARDS: { [key: string]: NFTStandards } = {
  ext: EXT,
  icpunks: ICPunks,
};

interface NFTRegistry {
  name: string;
  canisterId: string;
  toknes: NFTDetails[];
}

interface GetAllUserNFTsResponse {
  [standard: string]: NFTRegistry;
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
  NFTRegistry.map((dab) => {
    const NFTActor = getNFTActor(
      dab.principal_id.toString(),
      agent,
      dab.standard
    );
    const details = NFTActor.getUserTokens(user);
    if (!(dab.standard in result)) result[dab.standard] = [];
    result[dab.standard] = {
      name: dab.name,
      canisterId: dab.principal_id.toString(),
      tokens: details,
    };
  });
  return result;
};
