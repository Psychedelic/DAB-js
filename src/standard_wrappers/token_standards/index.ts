import {
  HttpAgent,
  ActorSubclass,
  blsVerify,
  CreateCertificateOptions,
} from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { IDL } from '@dfinity/candid';

import { createExtendedActorClass } from '../../utils/actorFactory';
import defaultMethods, {
  BalanceResponse,
  InternalTokenMethods,
  TokenServiceExtended,
} from './methods';
import xtcMethods from './xtcMethods';
import extMethods from './extMethods';
import dip20Methods from './dip20Methods';
import extIDL from '../../idls/ext.did';
import xtcIDL from '../../idls/xtc.did';
import icrc1IDL from '../../idls/icrc_1.did';
import dip20IDL from '../../idls/dip_20.did';
import drc20IDL from '../../idls/drc_20.did';
import icpIDL from '../../idls/ledger.did';
import { TOKEN } from '../../constants/standards';
import wicpIDL from '../../idls/wicp.did';
import wicpMethods from './wicpMethods';
import rosettaMethods from './rosettaMethods';
import icpStandardMethods from './icpStandardMethods';
import icrc1Methods from './icrc1Methods';
import drc20Methods from './drc20Methods';

const getMethods = (standard: string): InternalTokenMethods =>
  ({
    [TOKEN.xtc]: xtcMethods,
    [TOKEN.ext]: extMethods,
    [TOKEN.dip20]: dip20Methods,
    [TOKEN.wicp]: wicpMethods,
    [TOKEN.rosetta]: rosettaMethods,
    [TOKEN.icp]: icpStandardMethods,
    [TOKEN.icrc1]: icrc1Methods,
    [TOKEN.drc20]: drc20Methods,
  }[standard] || defaultMethods);

const getIdl = (standard: string): IDL.InterfaceFactory => {
  const idl = {
    [TOKEN.xtc]: xtcIDL,
    [TOKEN.ext]: extIDL,
    [TOKEN.dip20]: dip20IDL,
    [TOKEN.wicp]: wicpIDL,
    [TOKEN.rosetta]: icpIDL,
    [TOKEN.icp]: icpIDL,
    [TOKEN.icrc1]: icrc1IDL,
    [TOKEN.drc20]: drc20IDL,
  }[standard];
  if (!idl) throw new Error(`Standard ${standard} Not Implemented`);
  return idl;
};

export const createTokenActor = async <T>(
  canisterId: string | Principal,
  agent: HttpAgent,
  standard: string,
  blsVerify?: CreateCertificateOptions['blsVerify']
): Promise<ActorSubclass<TokenServiceExtended<T>>> => {
  const idl = getIdl(standard);
  const actor = new (createExtendedActorClass(
    agent,
    getMethods(standard),
    canisterId,
    idl,
    blsVerify
  ))() as unknown as ActorSubclass<TokenServiceExtended<any>>;
  return actor;
};

export const parseBalance = (balance: BalanceResponse): string => {
  return (parseInt(balance.value, 10) / 10 ** balance.decimals).toString();
};

export default {};

export { SendResponse } from './methods';
