import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { IC_HOST } from "../constants";
import RegistryStandardIDL from "../idls/registry_standard.did";
import RegistryStandard, { metadata } from "../interfaces/registry_standard";

const DEFAULT_AGENT = new HttpAgent({ fetch, host: IC_HOST });


class Registry {
    protected actor: ActorSubclass<RegistryStandard>; // Set as protected so that subclasses can override it
    public canisterId: string;
    constructor(canisterId, agent) {
        this.actor = Actor.createActor<RegistryStandard>(RegistryStandardIDL, {
            agent: agent || DEFAULT_AGENT,
            canisterId: this.canisterId,
        });
        this.canisterId = canisterId;
    }

    public name = async () => {
        return this.actor.name();
    }

    public add = async (principalId: string, metadata: metadata) => {
        return this.actor.add(Principal.fromText(principalId), metadata ?? []);
    }

    public get = async (principalId: string) => {
        return this.actor.get(Principal.fromText(principalId));
    }

    public remove = async (principalId: string) => {
        return this.actor.remove(Principal.fromText(principalId));
    }

}

export default Registry;
