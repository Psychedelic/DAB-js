import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { NFTDetails } from '../../interfaces/nft';

export default abstract class NFT<Tid = number, Tindex = bigint> {
  abstract standard: string;

  agent: HttpAgent;

  canisterId: string;

  constructor(canisterId: string, agent: HttpAgent) {
    this.agent = agent;
    this.canisterId = canisterId;
  }

  abstract getUserTokens(principal: Principal): Promise<NFTDetails<Tindex>[]>;

  abstract transfer(principal: Principal, tokenIndex: Tid): Promise<void>;

  abstract details(tokenIndex: Tid ): Promise<NFTDetails<Tindex>>;
}
