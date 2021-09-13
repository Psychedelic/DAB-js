/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/class-name-casing */
import { Principal } from '@dfinity/principal';

interface Registry {
  name: string;
  principal_id: Principal;
  standard: string;
}

export type GetAllResult = Registry[];

export default interface _SERVICE {
  get_all: () => Promise<GetAllResult>;
}
