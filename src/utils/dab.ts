import { Actor, HttpAgent } from '@dfinity/agent';

import dabInterface, { GetAllResult } from '../interfaces/dab';
import dabDid from '../idls/dab.did';
import { Principal } from '@dfinity/principal';

const DAB_CANISTER_ID = 'aipdg-waaaa-aaaah-aaq5q-cai';

const DAB_REGISTRY = [
  {
    standard: 'icpunks',
    principal_id: Principal.fromText('qcg3w-tyaaa-aaaah-qakea-cai'),
    name: 'ICPunks',
  },
  {
    standard: 'ext',
    principal_id: Principal.fromText('nbg4r-saaaa-aaaah-qap7a-cai'),
    name: 'Starverse',
  },
];

export const getAllNFTS = async (agent: HttpAgent): Promise<GetAllResult> => {
  const dabActor = Actor.createActor<dabInterface>(dabDid, {
    agent,
    canisterId: Principal.fromText(DAB_CANISTER_ID),
  });
  //return dabActor.get_all();

  return DAB_REGISTRY;
};

export default {};
