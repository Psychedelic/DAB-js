import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import NFT_ICPUNKS, { TokenDesc } from '../interfaces/icpunks';
import IDL from '../idls/icpunks.did';
import NFT, { NFTDetails } from '../nft';

const PRE_URL = 'https://qcg3w-tyaaa-aaaah-qakea-cai.raw.ic0.app';

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
    this.actor.transfer_to(to, BigInt(tokenIndex));
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenData = await this.actor.data_of(BigInt(tokenIndex));

    return this.serializeTokenData(tokenData);
  }

  private serializeTokenData = (tokenData: TokenDesc): NFTDetails => ({
    index: BigInt(tokenData.id),
    canister: this.canisterId,
    url: tokenData.url,
    name: tokenData.name,
    metadata: tokenData,
    standard: this.standard,
  });
}
