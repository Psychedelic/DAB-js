import { Principal } from "@dfinity/principal";

export type SendResponse =
  | { height: string }
  | { amount: string }
  | { transactionId: string };

export interface Token {
    'logo' : string,
    'name' : string,
    'description' : string,
    'website' : string,
    'timestamp' : bigint,
    'principal_id' : Principal,
    'standard' : string,
    'total_supply' : [] | [bigint],
    'symbol' : string,
  }