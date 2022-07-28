import { HttpAgent, ActorSubclass } from '@dfinity/agent';
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
import dip20IDL from '../../idls/dip_20.did';
import icpIDL from '../../idls/ledger.did';
import { TOKEN } from '../../constants/standards'
import wicpIDL from '../../idls/wicp.did';
import wicpMethods from './wicpMethods';
import rosettaMethods from './rosettaMethods';
import icpStandardMethods from './icpStandardMethods';

const getMethods = (standard: string): InternalTokenMethods =>
  ({
    [TOKEN.xtc]: xtcMethods,
    [TOKEN.ext]: extMethods,
    [TOKEN.dip20]: dip20Methods,
    [TOKEN.wicp]: wicpMethods,
    [TOKEN.rosetta]: rosettaMethods,
    [TOKEN.icp]: icpStandardMethods,
  }[standard] || defaultMethods);

const getIdl = (standard: string): IDL.InterfaceFactory => {
  const idl = {
    [TOKEN.xtc]: xtcIDL,
    [TOKEN.ext]: extIDL,
    [TOKEN.dip20]: dip20IDL,
    [TOKEN.wicp]: wicpIDL,
    [TOKEN.rosetta]: icpIDL,
    [TOKEN.icp]: icpIDL
  }[standard];
  if (!idl) throw new Error(`Standard ${standard} Not Implemented`);
  return idl;
};

export const createTokenActor = async <T>(
  canisterId: string | Principal,
  agent: HttpAgent,
  standard: string,
): Promise<ActorSubclass<TokenServiceExtended<T>>> => {
  const idl = getIdl(standard);
  const actor = (new (createExtendedActorClass(
    agent,
    getMethods(standard),
    canisterId,
    idl
  ))() as unknown) as ActorSubclass<TokenServiceExtended<any>>;
  return actor;
};

export const parseBalance = (balance: BalanceResponse): string => {
  return (parseInt(balance.value, 10) / 10 ** balance.decimals).toString();
};

export default {};

export { SendResponse } from './methods';
