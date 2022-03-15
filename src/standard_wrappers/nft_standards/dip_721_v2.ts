import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { NFTDetails } from '../../interfaces/nft';
import Interface, { TokenMetadata, GenericValue } from '../../interfaces/dip_721_v2';
import IDL from '../../idls/dip_721_v2.did';
import NFT from './default';
import { NFT as NFTStandard} from '../../constants/standards';
import { ok } from 'assert';

interface Property {
  name: string;
  value: string;
}

interface MetadataKeyVal { 'key' : string, 'val' : GenericValue }

interface Metadata {
  [key: string]: { value: MetadataKeyVal , purpose: string } | Array<Property> | string;
  properties: Array<Property>;
}

const extractMetadataValue = (metadata: any) => {
  const metadataKey = Object.keys(metadata)[0];
  const value = metadata[metadataKey];
  return typeof value === 'object' ? JSON.stringify(value) : value;
};

export default class ERC721 extends NFT {
  standard = NFTStandard.dip721;

  actor: ActorSubclass<Interface>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent, canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const userTokensResult = await this.actor.ownerTokenMetadata(principal);
    const tokens: Array<TokenMetadata> = userTokensResult['Ok'] || [];
    console.log(tokens)
    return tokens.map((token) => {
      const tokenIndex = token.token_identifier;
      const formatedMetadata = this.formatMetadata(token);

      return this.serializeTokenData(
        formatedMetadata,
        tokenIndex
      );
    });
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const from = await this.agent.getPrincipal();

    const transferResult = await this.actor.transferFrom(from, to, BigInt(tokenIndex));
    if ('Err' in transferResult)
      throw new Error(
        `${Object.keys(transferResult.Err)[0]}: ${Object.values(transferResult.Err)[0]
        }`
      );
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const metadataResult = await this.actor.tokenMetadata(BigInt(tokenIndex));

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
      metadata,
      url: metadata?.location?.value?.TextContent || '',
      standard: this.standard,
    };
  }

  private formatMetadata(metadata: TokenMetadata): Metadata {
      const owner = metadata.owner[0] ? metadata.owner[0].toText() : "aaaaa-aa";
      const metadataResult = { owner, properties: new Array<Property>() };
          
          metadata.properties.map((prop) => {
            metadataResult[prop[0]] = { value: prop[1] };
            metadataResult.properties = [...metadataResult.properties, { name: prop[0], value: extractMetadataValue(prop[1]) }];
          });
  
          // Filter out reserved props from the unique traits
          metadataResult.properties = metadataResult.properties.filter(({ name }) => !['location', 'thumbnail', 'contentHash', 'contentType'].includes(name));
          return metadataResult;
    }
}
