import {Actor, ActorSubclass, HttpAgent} from '@dfinity/agent';
import {Principal} from '@dfinity/principal';

import NFT_Origyn, {
  Result_5,
} from '../../interfaces/nft_origyn';
import IDL from '../../idls/nft_origyn.did';
import NFT from './default';
import {NFTDetails, NFTCollection} from '../../interfaces/nft';
import {NFT as NFTStandard} from '../../constants/standards';
import { MetadataReturn } from '../../interfaces/dip_721';

export default class NFTOrigyn extends NFT<string, string> {
  standard = NFTStandard.nftOrigyn;

  actor: ActorSubclass<NFT_Origyn>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails<string>[]> {
    const tokensIndexes = await this.actor.balance_of_nft_origyn({principal});
    if ('err' in tokensIndexes) {
      throw new Error(Object.keys(tokensIndexes.err)[0]);
    }
    const tokensData = await Promise.all(
      tokensIndexes.ok.nfts.map(async (item) => {
        const userTokensResult = await this.actor.nft_origyn(item);
        if ('err' in userTokensResult)
          throw new Error(Object.keys(userTokensResult.err)[0]);
        return {detail: userTokensResult, principal};
      })
    );
    return tokensData.map((token) => this.serializeTokenData(token.detail));
  }

  getMetadata(): Promise<NFTCollection> {
    throw new Error('Method not implemented.');
  }
  async transfer(to: Principal, tokenIndex: string): Promise<void> {
    const from = await this.agent.getPrincipal();
    const balance = await this.actor.balance_of_nft_origyn({principal: to});
    if ('err' in balance) {
      throw new Error(Object.keys(balance.err)[0]);
    }
    const escrow = balance.ok.escrow.find(({token_id}) => token_id === tokenIndex);
    if (!escrow) {
      // This error occurs if no pending escrows for this NFT exist (see market_transfer_nft_origyn comment)
      throw new Error("No pending escrows for transfer.");
    }
    // market transfer relies on escrow(payment) existing for NFT, to only be able to sell NFTs directly thru canister
    // there is owner_transfer_nft_origyn which take "from" and "to" params, but that method is not preferred
    const transferResult = await this.actor.market_transfer_nft_origyn({
      'token_id' : tokenIndex,
      'sales_config' : {
        pricing: { 'instant' : null },
        escrow_receipt: [escrow]
      },
    });
    if ('err' in transferResult)
      throw new Error(Object.keys(transferResult.err)[0]);
  }

  async details(tokenIndex: string): Promise<NFTDetails<string>> {
    const tokenData = await this.actor.nft_origyn(tokenIndex);
    return this.serializeTokenData(tokenData);
  }

  private serializeTokenData = (tokenData: Result_5): NFTDetails<string> => {
    if ('err' in tokenData) throw new Error(Object.keys(tokenData.err)[0]);
    const metadata = tokenData.ok.metadata as {Class: Array<any>};
    const tokenID = metadata.Class.find(({name}) => name === "id").value.Text;
    return {
      index: tokenID,
      canister: this.canisterId,
      url: `https://${this.canisterId}.raw.ic0.app/-/${tokenID}`, // add "/info" for metadata route
      name: tokenID,
      metadata: metadata,
      standard: this.standard,
    }
  }
}
