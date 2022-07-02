import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import ITOKA_NFT, { TokenMetadata, TokenInfoExt } from '../../interfaces/itoka';
import IDL from '../../idls/itoka.did';
import NFT from './default';
import { NFTDetails } from '../../interfaces/nft';
import { NFT as NFTStandard } from '../../constants/standards';

export default class ITOKA extends NFT {
  standard = NFTStandard.itoka;

  actor: ActorSubclass<ITOKA_NFT>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const tokensData = await this.actor.getUserTokens(principal);
    return tokensData.map((token) => this.serializeTokenData(token));
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const TxReceipt = await this.actor.transfer(to, BigInt(tokenIndex));
    if ('Err' in TxReceipt) throw new Error(Object.keys(TxReceipt.Err)[0]);
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenData = await this.actor.getTokenInfo(BigInt(tokenIndex));
    return this.serializeTokenData(tokenData);
  }

  private serializeTokenData = (tokenData: TokenInfoExt): NFTDetails => ({
    index: BigInt(tokenData.index),
    canister: this.canisterId,
    id: tokenData.metadata[0]?.tokenIdentifier,
    name: tokenData.metadata[0]?.attributes.name,
    url: tokenData.metadata[0]?.albumCoverLocation.icp as string,
    metadata: tokenData.metadata,
    standard: this.standard,
    owner: tokenData.owner,
  });
}
