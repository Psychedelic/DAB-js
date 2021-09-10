import { Principal } from '@dfinity/principal';
import { Actor, HttpAgent } from '@dfinity/agent';

import dabInterface, { GetAllResult } from '../interfaces/dab';
import dabDid from '../idls/dab.did';
const DAB_CANISTER_ID = '';

export const getAllNFTS = async (agent: HttpAgent): Promise<GetAllResult> => {
  const dabActor = Actor.createActor<dabInterface>(dabDid, {
    agent,
    canisterId: DAB_CANISTER_ID,
  });
  return dabActor.get_all();
};
