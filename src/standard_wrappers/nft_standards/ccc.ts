import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import NFT_C3, { GetTokenResponse, TokenDetails, TransferResponse } from '../../interfaces/c3';
import IDL from '../../idls/c3.did';
import NFT from './default';
import { NFTDetails } from '../../interfaces/nft';
import { NFT as NFTStandard} from '../../constants/standards';


export default class CCC extends NFT {
  standard = NFTStandard.c3;

  actor: ActorSubclass<NFT_C3>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const tokensIndexes = await this.actor.getAllNFT(principal);
    
    const tokensData = await Promise.all(
      tokensIndexes.map(async(item) => {
        const res:GetTokenResponse = await this.actor.getTokenById(item[0])
        return [res.ok, item[1]]
      })
    );

    return tokensData.map((token) => this.serializeTokenData(token[0], token[1]));
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const from = await this.agent.getPrincipal();
    const success:TransferResponse = await this.actor.transferFrom(from, to, BigInt(tokenIndex));
    if (success.err) {
      for (let key in success.err)
        throw new Error(`Error transfering ${key}`);
    }
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenData = await this.actor.getTokenById(BigInt(tokenIndex));
    const prinId = await this.actor.getNftStoreCIDByIndex(BigInt(tokenIndex));
    return this.serializeTokenData(tokenData.ok, prinId);
  }

  private serializeTokenData = (tokenData: TokenDetails, prinId: Principal): NFTDetails => {
    return {
      index: BigInt(tokenData.id),
      canister: this.canisterId,
      url: `https://${prinId.toText()}.raw.ic0.app/token/${tokenData.id}`,
      name: `${tokenData.id}`,
      metadata: tokenData,
      standard: this.standard,
    }
  }
    
}
