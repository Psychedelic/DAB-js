import { HttpAgent, Actor } from '@dfinity/agent';
import AddressBookInterface, {
  Response,
  Address,
} from '../interfaces/dab_registries/address_book';
import addressBookIDL from '../idls/dab_registries/address_book.did';

const CANISTER_ID = 'i73cm-daaaa-aaaah-abhea-cai';

export const getAddressBookActor = (agent: HttpAgent) => {
  const actor = Actor.createActor<AddressBookInterface>(addressBookIDL, {
    agent,
    canisterId: CANISTER_ID,
  });
  return actor;
};

export const getAddresses = async (
  agent: HttpAgent
): Promise<Array<Address>> => {
  const actor = getAddressBookActor(agent);
  const addresses = await actor.get_all();

  return addresses.map(
    (address) =>
      ({
        name: address.name,
        description: address.description,
        emoji: address.emoji,
        value: address.value,
      } as Address)
  );
};

export const addAddress = async (
  agent: HttpAgent,
  newAddress: Address
): Promise<Response> => {
  const actor = getAddressBookActor(agent);

  const addResponse = await actor.add({
    name: newAddress.name,
    description: newAddress.description,
    emoji: newAddress.emoji,
    value: newAddress.value,
  });

  return addResponse;
};

export const removeAddress = async (
  agent: HttpAgent,
  addressName: string
): Promise<Response> => {
  const actor = getAddressBookActor(agent);

  const removeResponse = await actor.remove(addressName);

  return removeResponse;
};

export default {
  getAddressBookActor,
  getAddresses,
  addAddress,
  removeAddress,
};
