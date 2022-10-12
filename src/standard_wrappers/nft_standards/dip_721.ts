import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

import { NFTDetails } from '../../interfaces/nft';
import Interface, {
  TokenMetadata,
  GenericValue,
} from '../../interfaces/dip_721';
import IDL from '../../idls/dip_721.did';
import NFT from './default';
import { NFT as NFTStandard } from '../../constants/standards';

interface Property {
  name: string;
  value: string;
}

interface MetadataKeyVal {
  key: string;
  val: GenericValue;
}

interface Metadata {
  [key: string]:
    | { value: MetadataKeyVal; purpose: string }
    | Array<Property>
    | string;
  properties: Array<Property>;
}

const extractMetadataValue = (metadata: any) => {
  const metadataKey = Object.keys(metadata)[0];
  const value = metadata[metadataKey];
  return typeof value === 'object' ? JSON.stringify(value) : value;
};

const deprecationWarningForDip721LegacyRequests = ({
  methodName
}: {
  methodName: string,
}) => `Oops! An attempt to ${methodName} failed, a fallback to legacy will be used. Legacy DIP721 contract support will be dropped soon, the contract should be updated`

export default class ERC721 extends NFT {
  standard = NFTStandard.dip721;

  actor: ActorSubclass<Interface>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const userTokensResult = await (async () => {
      let res;

      try {
        res = await this.actor.dip721_owner_token_identifiers(principal);
      } catch (err) {
        deprecationWarningForDip721LegacyRequests({
          methodName: 'dip721_owner_token_identifiers',
        });

        res = await this.actor.ownerTokenMetadata(principal);
      }

      return res;
    })();

    const tokens: Array<TokenMetadata> = userTokensResult['Ok'] || [];

    return tokens.map((token) => {
      const tokenIndex = token.token_identifier;
      const formatedMetadata = this.formatMetadata(token);
      const operator = token.operator?.[0]?.toText();

      return this.serializeTokenData(
        formatedMetadata,
        tokenIndex,
        principal.toText(),
        operator,
      );
    });
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const transferResult = await (async () => {
      let res;

      try {
        res = await this.actor.dip721_transfer(
          to,
          BigInt(tokenIndex)
        );
      } catch (err) {
        deprecationWarningForDip721LegacyRequests({
          methodName: 'dip721_transfer',
        });

        res = await this.actor.transfer(
          to,
          BigInt(tokenIndex)
        );
      }

      return res;
    })();

    if ('Err' in transferResult)
      throw new Error(
        `${Object.keys(transferResult.Err)[0]}: ${
          Object.values(transferResult.Err)[0]
        }`
      );
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const metadataResult = await (async () => {
      let res;

      try {
        res = await this.actor.dip721_token_metadata(BigInt(tokenIndex))
      } catch (err) {
        deprecationWarningForDip721LegacyRequests({
          methodName: 'dip721_token_metadata',
        });

        res = await this.actor.tokenMetadata(BigInt(tokenIndex));
      }

      return res;
    })();

    if ('Err' in metadataResult)
      throw new Error(
        `${Object.keys(metadataResult.Err)[0]}: ${
          Object.values(metadataResult.Err)[0]
        }`
      );
    const metadata = metadataResult?.Ok;
    const formatedMetadata = this.formatMetadata(metadata);
    const owner = metadata?.owner?.[0]?.toText?.();
    const operator = metadata?.operator?.[0]?.toText?.();

    return this.serializeTokenData(formatedMetadata, tokenIndex, owner, operator);
  }

  private serializeTokenData(
    metadata: any,
    tokenIndex: number | bigint,
    owner: string | undefined,
    operator: string | undefined
  ): NFTDetails {
    return {
      index: BigInt(tokenIndex),
      canister: this.canisterId,
      metadata,
      owner,
      url: metadata?.location?.value?.TextContent || '',
      standard: this.standard,
      operator,
    };
  }

  private formatMetadata(metadata: TokenMetadata): Metadata {
    const metadataResult = { properties: new Array<Property>() };

    metadata.properties.map((prop) => {
      metadataResult[prop[0]] = { value: prop[1] };
      metadataResult.properties = [
        ...metadataResult.properties,
        { name: prop[0], value: extractMetadataValue(prop[1]) },
      ];
    });

    // Filter out reserved props from the unique traits
    metadataResult.properties = metadataResult.properties.filter(
      ({ name }) =>
        !['location', 'thumbnail', 'contentHash', 'contentType'].includes(name)
    );
    return metadataResult;
  }
}
