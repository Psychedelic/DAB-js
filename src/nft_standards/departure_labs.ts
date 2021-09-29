import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import NFT_DEPARTURE_LABS, { Metadata } from '../interfaces/departure_labs';
import IDL from '../idls/departure_labs.did';
import NFT from './default';
import { NFTDetails } from '../interfaces/nft';

export default class DepartureLabs extends NFT {
  standard = 'DepartureLabs';

  actor: ActorSubclass<NFT_DEPARTURE_LABS>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const tokensIndexes = await this.actor.balanceOf(principal);

    const tokensData = await Promise.all(
      tokensIndexes.map(async (tokenIndex) => {
        const result = await this.actor.tokenMetadataByIndex(tokenIndex);
        if ('ok' in result) {
          return result.ok;
        } else {
          throw new Error('Error getting nft details'); // TODO Change this.
        }
      })
    );

    return tokensData.map((token) => this.serializeTokenData(token));
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const success = await this.actor.transfer(to, tokenIndex.toString(10));
    if (!success) {
      throw new Error('Error transfering token');
    }
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenData = await this.actor.tokenMetadataByIndex(tokenIndex.toString(10));
    if ('ok' in tokenData) {
      return this.serializeTokenData(tokenData.ok);
    } else {
      throw new Error('Error fetching token details');
    }
  }

  private serializeTokenData = (tokenData: Metadata): NFTDetails => ({
    index: BigInt(tokenData.id),
    canister: this.canisterId,
    url: `https://${this.canisterId}.raw.ic0.app/${tokenData.id}`,
    metadata: tokenData,
    standard: this.standard,
  });
}
