import { HttpAgent, Actor, Identity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import fetch from 'cross-fetch';
import { IC_HOST } from '../constants';
import AddressBookInterface, { Response as AddressBookResponse, AddressMetadata } from '../interfaces/dab_registries/address_book';
import addressBookIDL from '../idls/dab_registries/address_book.did';

const CANISTER_ID = 'i73cm-daaaa-aaaah-abhea-cai';
export interface Address {
    name: string,
    description?: string,
    emoji?: string,
    principalId: string
}

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
        principalId: address.principal_id.toString()
    }) as Address);
}

export const addAddress = async (identity: Identity,  newAddress: Address): Promise<AddressBookResponse> => {
    const actor = getAddressBookActor(identity);
    
    const newAddressMetadata = {
        name: newAddress.name,
        description: newAddress.description,
        emoji: newAddress.emoji,
        principal_id: Principal.fromText(newAddress.principalId),
    } as AddressMetadata;

    const addResponse = await actor.add(newAddressMetadata);
    
    return addResponse;
}

export const removeAddress = async (identity: Identity, addressName: string): Promise<AddressBookResponse>=> {
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