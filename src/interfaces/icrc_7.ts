import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export type Subaccount = Uint8Array | number[];
export interface TransferArg {
  to: Account;
  token_id: bigint;
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [] | [bigint];
}
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { Duplicate: { duplicate_of: bigint } }
  | { NonExistingTokenId: null }
  | { Unauthorized: null }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { InvalidRecipient: null }
  | { GenericBatchError: { message: string; error_code: bigint } }
  | { TooOld: null };
export type TransferResult = { Ok: bigint } | { Err: TransferError };
export type Value =
  | { Int: bigint }
  | { Map: Array<[string, Value]> }
  | { Nat: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string }
  | { Array: Array<Value> };
export interface _SERVICE {
  icrc7_atomic_batch_transfers: ActorMethod<[], [] | [boolean]>;
  icrc7_balance_of: ActorMethod<[Array<Account>], Array<bigint>>;
  icrc7_collection_metadata: ActorMethod<[], Array<[string, Value]>>;
  icrc7_default_take_value: ActorMethod<[], [] | [bigint]>;
  icrc7_description: ActorMethod<[], [] | [string]>;
  icrc7_logo: ActorMethod<[], [] | [string]>;
  icrc7_max_memo_size: ActorMethod<[], [] | [bigint]>;
  icrc7_max_query_batch_size: ActorMethod<[], [] | [bigint]>;
  icrc7_max_take_value: ActorMethod<[], [] | [bigint]>;
  icrc7_max_update_batch_size: ActorMethod<[], [] | [bigint]>;
  icrc7_name: ActorMethod<[], string>;
  icrc7_owner_of: ActorMethod<[Array<bigint>], Array<[] | [Account]>>;
  icrc7_permitted_drift: ActorMethod<[], [] | [bigint]>;
  icrc7_supply_cap: ActorMethod<[], [] | [bigint]>;
  icrc7_symbol: ActorMethod<[], string>;
  icrc7_token_metadata: ActorMethod<
    [Array<bigint>],
    Array<[] | [Array<[string, Value]>]>
  >;
  icrc7_tokens: ActorMethod<[[] | [bigint], [] | [bigint]], Array<bigint>>;
  icrc7_tokens_of: ActorMethod<
    [Account, [] | [bigint], [] | [bigint]],
    Array<bigint>
  >;
  icrc7_total_supply: ActorMethod<[], bigint>;
  icrc7_transfer: ActorMethod<
    [Array<TransferArg>],
    Array<[] | [TransferResult]>
  >;
  icrc7_tx_window: ActorMethod<[], [] | [bigint]>;
}
