import type { Principal } from '@dfinity/principal';
export type ApiError =
  | { ZeroAddress: null }
  | { InvalidTokenId: null }
  | { Unauthorized: null };
export interface ExtendedMetadataResult {
  token_id: bigint;
  metadata_desc: MetadataDesc;
}
export type InterfaceId =
  | { Burn: null }
  | { Mint: null }
  | { Approval: null }
  | { TransactionHistory: null }
  | { TransferNotification: null };
export interface LogoResult {
  data: string;
  logo_type: string;
}
export type MetadataDesc = Array<MetadataPart>;
export interface MetadataKeyVal {
  key: string;
  val: MetadataVal;
}
export interface MetadataPart {
  data: Array<number>;
  key_val_data: Array<MetadataKeyVal>;
  purpose: MetadataPurpose;
}
export type MetadataPurpose = { Preview: null } | { Rendered: null };
export type MetadataResult = { Ok: MetadataDesc } | { Err: ApiError };
export type MetadataVal =
  | { Nat64Content: bigint }
  | { Nat32Content: number }
  | { Nat8Content: number }
  | { NatContent: bigint }
  | { Nat16Content: number }
  | { BlobContent: Array<number> }
  | { TextContent: string };
export type MintReceipt = { Ok: MintReceiptPart } | { Err: ApiError };
export interface MintReceiptPart {
  id: bigint;
  token_id: bigint;
}
export type OwnerResult = { Ok: Principal } | { Err: ApiError };
export interface TransactionResult {
  fee: bigint;
  transaction_type: TransactionType;
}
export type TransactionType =
  | {
    Approve: { to: Principal; token_id: bigint; from: Principal };
  }
  | { Burn: { token_id: bigint } }
  | { Mint: { token_id: bigint } }
  | { SetApprovalForAll: { to: Principal; from: Principal } }
  | {
    TransferFrom: {
      to: Principal;
      token_id: bigint;
      from: Principal;
      caller: [] | [Principal];
    };
  };

export type TxReceipt = { Ok: bigint } | { Err: ApiError };
export interface erc721_token {
  balanceOfDip721: (arg_0: Principal) => Promise<bigint>;
  getMaxLimitDip721: () => Promise<number>;
  getMetadataDip721: (arg_0: bigint) => Promise<MetadataResult>;
  getMetadataForUserDip721: (
    arg_0: Principal
  ) => Promise<Array<ExtendedMetadataResult>>;
  getTransactionDip721: (arg_0: bigint) => Promise<TransactionResult>;
  getTransactionsDip721: (
    arg_0: bigint,
    arg_1: number
  ) => Promise<Array<TransactionResult>>;
  getUserTransactionsDip721: (
    arg_0: bigint,
    arg_1: number,
    arg_2: Principal
  ) => Promise<Array<TransactionResult>>;
  logoDip721: () => Promise<LogoResult>;
  mintDip721: (arg_0: Principal, arg_1: MetadataDesc) => Promise<MintReceipt>;
  nameDip721: () => Promise<string>;
  ownerOfDip721: (arg_0: bigint) => Promise<OwnerResult>;
  safeTransferFromDip721: (
    arg_0: Principal,
    arg_1: Principal,
    arg_2: bigint
  ) => Promise<TxReceipt>;
  supportedInterfacesDip721: () => Promise<Array<InterfaceId>>;
  symbolDip721: () => Promise<string>;
  totalSupplyDip721: () => Promise<bigint>;
  transferFromDip721: (
    arg_0: Principal,
    arg_1: Principal,
    arg_2: bigint
  ) => Promise<TxReceipt>;
}
export default erc721_token;
