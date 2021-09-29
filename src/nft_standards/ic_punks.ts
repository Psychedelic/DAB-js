import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import NFT_ICPUNKS, { TokenDesc } from '../interfaces/icpunks';
import IDL from '../idls/icpunks.did';
import NFT from './default';
import { NFTDetails } from '../interfaces/nft';

export default class ICPUNKS extends NFT {
  standard = 'ICPunks';

  actor: ActorSubclass<NFT_ICPUNKS>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const tokensIndexes = await this.actor.user_tokens(principal);

    const tokensData = await Promise.all(
      tokensIndexes.map((tokenIndex) => this.actor.data_of(tokenIndex))
    );

    return tokensData.map((token) => this.serializeTokenData(token));
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const success = await this.actor.transfer_to(to, BigInt(tokenIndex));
    if (!success) {
      throw new Error('Error transfering token');
    }
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenData = await this.actor.data_of(BigInt(tokenIndex));

    return this.serializeTokenData(tokenData);
  }

  private serializeTokenData = (tokenData: TokenDesc): NFTDetails => ({
    index: BigInt(tokenData.id),
    canister: this.canisterId,
    url: `https://${this.canisterId}.raw.ic0.app${tokenData.url}`,
    name: tokenData.name,
    metadata: tokenData,
    standard: this.standard,
  });
}
