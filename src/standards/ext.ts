import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import NTF_EXT, { TokenIdentifier } from '../interfaces/ext';
import IDL from '../idls/ext.did';
import NFT, { NFTDetails } from '../nft';
import { getAccountId } from '../utils/account';
import { to32bits } from '../utils/number';

const getTokenIdentifier = (canister: string, index: number): string => {
  const padding = Buffer.from('\x0Atid');
  const array = new Uint8Array([
    ...padding,
    ...Principal.fromText(canister).toUint8Array(),
    ...to32bits(index),
  ]);
  return Principal.fromUint8Array(array).toText();
};

export default class EXT extends NFT {
  standard = 'EXT';

  actor: ActorSubclass<NTF_EXT>;

  constructor(canisterId: string, agent: HttpAgent) {
    super(canisterId, agent);

    this.actor = Actor.createActor(IDL, {
      agent,
      canisterId,
    });
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails[]> {
    const accountId = getAccountId(principal);
    const userTokensResult = await this.actor.tokens_ext(accountId);
    if ('error' in userTokensResult)
      throw new Error(Object.keys(userTokensResult.error)[0]);

    const tokens = userTokensResult.ok || [];

    return tokens.map((token) => {
      const metadata = token[2];
      const tokenIndex = token[0];

      return this.serializeTokenData(
        metadata,
        getTokenIdentifier(this.canisterId, tokenIndex),
        tokenIndex
      );
    });
  }

  async transfer(to: Principal, tokenIndex: number): Promise<void> {
    const tokenIdentifier = getTokenIdentifier(this.canisterId, tokenIndex);
    const from = await this.agent.getPrincipal();
    const dummyMemmo = new Array(32).fill(0);

    this.actor.transfer({
      to: { principal: to },
      from: { principal: from },
      token: tokenIdentifier,
      amount: BigInt(1),
      memo: dummyMemmo,
      notify: false,
    });
  }

  async details(tokenIndex: number): Promise<NFTDetails> {
    const tokenIdentifier = getTokenIdentifier(this.canisterId, tokenIndex);
    const metadataResult = await this.actor.metadata(tokenIdentifier);

    if ('error' in metadataResult)
      throw new Error(Object.keys(metadataResult.error)[0]);

    const { metadata } = metadataResult.ok.nonfungible;

    return this.serializeTokenData(metadata, tokenIdentifier, tokenIndex);
  }

  private serializeTokenData(
    metadata: any,
    tokenIdentifier: string,
    tokenIndex: number
  ): NFTDetails {
    return {
      id: tokenIdentifier,
      index: BigInt(tokenIndex),
      canister: this.canisterId,
      metadata: metadata.length ? metadata[0] : undefined,
      url: `https://${this.canisterId}.raw.ic0.app/?type=thumbnail&tokenid=${tokenIdentifier}`,
      standard: this.standard,
    };
  }
}
