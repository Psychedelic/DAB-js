import { Actor, HttpAgent } from '@dfinity/agent';

import dabInterface, { GetAllResult } from '../interfaces/dab';
import dabDid from '../idls/dab.did';
import { Principal } from '@dfinity/principal';

const DAB_CANISTER_ID = 'aipdg-waaaa-aaaah-aaq5q-cai';

export const getAllNFTS = async (agent: HttpAgent): Promise<GetAllResult> => {
  const dabActor = Actor.createActor<dabInterface>(dabDid, {
    agent,
    canisterId: Principal.fromText(DAB_CANISTER_ID),
  });
  return dabActor.get_all();
};

export default {};
