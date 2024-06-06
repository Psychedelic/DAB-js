import { Principal } from '@dfinity/principal';
import { NFTDetails, NFTCollection } from '../../interfaces/nft';

import { _SERVICE as NFT_ICRC7, Value } from '../../interfaces/icrc_7';
import { idlFactory } from '../../idls/icrc_7.did';

import NFT from './default';
import { NFT as NFTStandard } from '../../constants/standards';
import {
  Actor,
  ActorSubclass,
  CreateCertificateOptions,
  HttpAgent,
} from '@dfinity/agent';

const PAGE_SIZE = 1;

export default class ICRC7 extends NFT {
  standard = NFTStandard.icrc7;
  actor: ActorSubclass<NFT_ICRC7>;

  constructor(
    canisterId: string,
    agent: HttpAgent,
    blsVerify?: CreateCertificateOptions['blsVerify']
  ) {
    super(canisterId, agent);

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
      blsVerify,
    });
  }

  findMetada(key: string, metadata: [string, Value][]) {
    return (metadata.find((meta) => meta[0] === key)?.[1] as { Text: string })
      ?.Text;
  }

  mapToken(id: bigint, metadata: [string, Value][], owner: string) {
    return {
      index: id,
      canister: this.canisterId,
      name: this.findMetada('Name', metadata),
      url: this.findMetada('logo', metadata),
      standard: 'ICRC7',
      owner,
      metadata,
    };
  }

  async getUserTokens(principal: Principal): Promise<NFTDetails<bigint>[]> {
    let ids: bigint[] = [];
    let shouldLoad = true;

    while (shouldLoad) {
      const newIds = await this.actor.icrc7_tokens_of(
        { owner: principal, subaccount: [] },
        ids.length === 0 ? [] : [ids[ids.length - 1]],
        [BigInt(PAGE_SIZE)]
      );

      const filtered = newIds.filter((id) => !ids.includes(id));

      ids = [...ids, ...filtered];
      shouldLoad = filtered.length >= PAGE_SIZE;
    }

    const metadata = await this.actor.icrc7_token_metadata(ids);
    const response = metadata[0] as [string, Value][][];

    return response.map((metadata, index) =>
      this.mapToken(ids[index], metadata, principal.toString())
    );
  }

  async transfer(principal: Principal, tokenIndex: number): Promise<void> {
    const result = await this.actor.icrc7_transfer([
      {
        to: {
          owner: principal,
          subaccount: [],
        },
        token_id: BigInt(tokenIndex),
        memo: [],
        from_subaccount: [],
        created_at_time: [],
      },
    ])[0];

    if ('Err' in result[0]) {
      throw new Error(Object.keys(result[0].Err)[0]);
    }
  }

  async getMetadata(): Promise<NFTCollection> {
    throw new Error('Method not implemented.');
  }

  async details(tokenIndex: number): Promise<NFTDetails<bigint>> {
    const details = await this.actor.icrc7_token_metadata([BigInt(tokenIndex)]);
    const owner = await this.actor.icrc7_owner_of([BigInt(tokenIndex)]);

    if (details.length === 0) return Promise.reject('No metadata available');

    return this.mapToken(
      BigInt(tokenIndex),
      details[0][0]!,
      owner[0][0]?.owner?.toString() || ''
    );
  }
}
