import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { NFTDetails } from '../interfaces/nft';
import Interface, { MetadataPart } from '../interfaces/erc_721';
import IDL from '../idls/erc_721.did';
import NFT from './default';
import standards from '../constants/standards';

export default class ERC721 extends NFT {
  standard = standards.erc721;

  actor: ActorSubclass<Interface>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent, canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const userTokensResult = await this.actor.getMetadataForUserDip721(principal);

    const tokens = userTokensResult || [];

    return tokens.map((token) => {
      const tokenIndex = token.token_id;
      const formatedMetadata = this.formatMetadata(token.metadata_desc);

      return this.serializeTokenData(
        formatedMetadata,
        tokenIndex
      );
    });
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const from = await this.agent.getPrincipal();

    const transferResult = await this.actor.transferFromDip721(from, to, BigInt(tokenIndex));
    if ('Err' in transferResult)
      throw new Error(
        `${Object.keys(transferResult.Err)[0]}: ${Object.values(transferResult.Err)[0]
        }`
      );
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const metadataResult = await this.actor.getMetadataDip721(BigInt(tokenIndex));

    if ('Err' in metadataResult)
      throw new Error(
        `${Object.keys(metadataResult.Err)[0]}: ${Object.values(metadataResult.Err)[0]
        }`
      );
    const metadata = metadataResult.Ok;
    const formatedMetadata = this.formatMetadata(metadata)

    return this.serializeTokenData(formatedMetadata, tokenIndex);
  }

  private serializeTokenData(
    metadata: any,
    tokenIndex: number | bigint
  ): NFTDetails {
    return {
      index: BigInt(tokenIndex),
      canister: this.canisterId,
      metadata: metadata,
      url: metadata?.location,
      standard: this.standard,
    };
  }

  private formatMetadata(metadata: Array<MetadataPart>) {
    const metadataResult = {}
    for (const part of metadata) {
      const purpose = Object.keys(part.purpose)[0];
      part.key_val_data.forEach(({ key, val }) => metadataResult[key] = { value: val, purpose });
    }
    return metadataResult
  }
}
