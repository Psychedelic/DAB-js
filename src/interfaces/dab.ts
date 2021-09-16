/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/class-name-casing */
import { Principal } from '@dfinity/principal';

interface DABCollection {
  name: string;
  principal_id: Principal;
  standard: string;
  logo?: string;
  description?: string;
}

export type GetAllResult = DABCollection[];

export default interface _SERVICE {
  get_all: () => Promise<GetAllResult>;
}
