import { HttpAgent, Actor, Identity } from '@dfinity/agent';
import fetch from 'cross-fetch';
import { IC_HOST } from '../constants';
import AddressBookInterface, { Response, Address } from '../interfaces/dab_registries/address_book';
import addressBookIDL from '../idls/dab_registries/address_book.did';

const CANISTER_ID = 'i73cm-daaaa-aaaah-abhea-cai';

export const getAddressBookActor = (identity: Identity) => {
    const agent = new HttpAgent({ fetch, host: IC_HOST, identity })
    
    const actor = Actor.createActor<AddressBookInterface>(addressBookIDL, { agent, canisterId: CANISTER_ID });
    
    return actor;
}

export const getAddresses = async (identity: Identity): Promise<Array<Address>> => {
    const actor = getAddressBookActor(identity);

    const addresses = await actor.get_all();

    return addresses.map(address => ({
        name: address.name,
        description: address.description,
        emoji: address.emoji,
        value: address.value,
    }) as Address );
}

export const addAddress = async (identity: Identity,  newAddress: Address): Promise<Response> => {
    const actor = getAddressBookActor(identity);

    const addResponse = await actor.add(newAddress);
    
    return addResponse;
}

export const removeAddress = async (identity: Identity, addressName: string): Promise<Response>=> {
    const actor = getAddressBookActor(identity);
    
    const removeResponse = await actor.remove(addressName);
    
    return removeResponse;
}

export default {
    getAddressBookActor,
    getAddresses,
    addAddress,
    removeAddress,
};