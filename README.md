# ⚗️ DAB-js - A Library to Integrate & Interact with DAB

![](https://storageapi.fleek.co/nicopoggi-team-bucket/dab-gh-nft.png)

This is a JS library that wraps several necessary methods to integrate [DAB's registries/list](https://dab.ooo/) and its three registries:

- The NFT Registry
- The Canister Registry
- The Token Registry
- The Address Book

It also includes a **standard wrapper** that unifies several NFT standards (DIP721, EXT, ICPunks, etc...) and token standards (DIP721, EXT, etc..) under a their own common interface.

- [DAB's website](https://docs.dab.ooo)
- [DAB's main repository](https://github.com/psychedelic/dab)
- [DAB's documentation](https://docs.dab.ooo)

---

## TABLE OF CONTENTS
- [What is DAB?](#what-is-dab-and-what-registries-does-it-have)
- [What is DAB-js?](#dab-js-and-its-standard-wrapper)
- [Interaction Guide](#interaction-guide)
- [Setting up DAB-js](#setting-up-dab-js-in-your-project)
- [DAB Registry Standard](#dab-registry-standard)
- [NFT List](#nft-list)
- [Canister List](#canister-list)
- [Token List](#token-list)
- [Verified Registry Objects](#verified-registry-objects)

---
## What is DAB and what registries does it have? 

DAB is an open internet service for data registries. 

Anyone is able to create their own DAB Registry by following the [DAB Registry Standard](#dab-registry-standard).

As of V1.0.0, the current DAB registries are:

1-  **The NFT Registry**, a list of NFTs that apps & developers can consume to auto-surface a user's owned NFTs from multiple collections, and support new NFT collections as they are listed in DAB, instead of manually adding them one by one.

2- **The Canister Registry**, a canister registry where you can associate Canister IDs to a metadata profile (name, front-end URL, description, logo...) to make them more discoverable by UIs. **Using DAB-js, you will be able to query this metadata from a UI to show it, instead of just a plain Canister ID**.

3- **The Token Registry**, a list that holds metadata (name, symbol, logo, etc...) aginst tokens on the IC. This enables developers to write code once to auto-surface and interact with a user's current and future tokens, instead of manually adding integrations for every new token.
  
---

## DAB-js and its Standard Wrapper

DAB's NFT list is **standard agnostic**, meaning any NFT collection or Token can be listed regardless of the standard interface utilized. 

When integrating and consuming DAB's lists, this would quickly become a problem for developers that need to **use different methods, depending on the standard, to do a simple thing like transferring an NFT**.

**We solved this with the DAB-js library and its standard wrapper.** DAB-js provides a common javascript interface with standard methods (transfer, getUserTokens, details, etc..) that the developer can use to make calls to any NFT or Token, regardless of their standatd. **DAB's standard wrapper translates the call** to match the appropiate methods of each standards.

Currently, DAB-js wraps the following standards. **Developers are welcome to open PRs to suggest/help integrate new standards to DAB-js**.

### NFT STANDARDS

- [DIP721](https://github.com/Psychedelic/DIP721)
- [EXT NFT Standard](https://github.com/Toniq-Labs/extendable-token)
- [ICPunks NFT Standard](https://github.com/stopak/ICPunks/blob/dev/service/icpunks_rust.did)
- [Departure Labs](https://github.com/DepartureLabsIC/non-fungible-token)

### TOKEN STANDARDS

- [DIP20](https://github.com/Psychedelic/DIP20)
- [EXT Token Standard](https://github.com/Toniq-Labs/extendable-token/blob/main/examples/erc20.md)
- [XTC](https://github.com/Psychedelic/dank/tree/main/xtc)
- [WICP](https://github.com/Psychedelic/wicp)

---

## Interaction guide

To pull and install from [@Psychedelic](https://github.com/psychedelic) via the NPM CLI, you'll need:

- A Github account
- A Github personal access token (you can create a personal acess token [here](https://github.com/settings/tokens))
- The personal access token with the correct scopes, **repo** and **read:packages** to be granted access to the [GitHub Package Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
- Authentication via `npm login`, using your Github email for the **username** and the **personal access token** as your **password**:

Once you have those ready, run:

```
npm login --registry=https://npm.pkg.github.com --scope=@psychedelic
```

> **Note:** You only need to configure this once to install the package!
    On npm login provide your Github email as your username and the Personal access token as the password.

You can also setup your npm global settings to fetch from the Github registry everytime it finds a **@Psychdelic** package, find the instructions [here](https://docs.npmjs.com/configuring-your-registry-settings-as-an-npm-enterprise-user).

⚠️ Alternatively, a token could be passed to the `.npmrc` as `//npm.pkg.github.com/:_authToken=xxxxxx` but we'd like to keep it clean and tokenless.

---

## Setting up DAB-js in your project

First, you need to install the DAB-js **npm package** into your project.

You can do so from the command line:
```js
npm install @psychedelic/dab-js@latest
```

Find more details about installing versions in the package page [here](https://github.com/Psychedelic/DAB-js/packages/987540)

---

## DAB Registry Standard

The DAB Registry Standard represents an interface that registries can follow in order to qualify to interoperate with libraries / dapps that use DAB registries. DAB-js happens to be one of those libraries.

For more information on creating your own registry that follows the DAB Registry Standard, visit our docs [here](https://docs.dab.ooo/standard/getting-started/#create-your-own-registry-registry-standard).

### Interacting With DAB Registry Standard Registries Through DAB-js (name, get, add, remove)

In order to interact with a registry that follows the DAB Registry Standard, we need to create an instance of the Registry Class. This class's methods allow us to interact with the base functionality that every DAB registry must have.

First need to import the Registry class from the @psychedelic/dab-js library.

Next, we can create an instance of this class by passing in two parameters:

- `agent`: An Http agent, instantiated with agent-js (optional paramet, defaults to DFINITY's agent)
- `canisterID`: A string that represents the canister ID of the registry on IC mainnet.

```js
import { Registry } from '@psychedelic/dab-js';

const canisterID = 'REGISTRY_ID_HERE';

const createRegistry = (canisterID) => {
    const my_registry = new Registry(canisterID);
    return my_registry
}

const new_registry = createRegistry();
```

To configure your registry to interact with canisters on your local network, pass in a custom agent like so:

```js
import { Registry } from '@psychedelic/dab-js';

const canisterID = 'REGISTRY_ID_HERE';
const localAgent = new HttpAgent({ host: 'https://localhost:8080' }); 

const createLocalRegistry = (canisterID) => {
    const my_registry = new Registry(canisterID, localAgent);
    return my_registry
}

const new_registry = createRegistry();
```

Once instanciated, you can start to interact with your registry's base `name`, `get`, `add`, and `remove` methods.

Here's an example function to do so:

```js
const testRegistryMethods = async (registry: Registry, getId: string, addMetadata: Metadata) => {
    const name = await registry.name();
    console.log('Registry Name: ', name);

    console.log('Adding Entry: ', addMetadata);
    const addResponse = await registry.add(addMetadata);
    console.log('Add response', addResponse);

    console.log('Getting metadata for id', getId);
    const getResponse = await registry.get(getId);
    console.log('Get Response: ', getResponse);

    console.log('Removing metadata for id', getId);
    const removeResponse = await registry.remove(getId);
    console.log('Remove Response: ', removeResponse);

    console.log('Getting metadata for deleted id', getId);
    const emptyResponse = await registry.get(getId);
    console.log('Removed get response: ', emptyResponse);
};
```

---

## NFT List
### 1. 🎨 Fetching All NFTs the User Owns (getAllUserNFTs)

In this step, you will use the getAllUserNFTs method to get an array with all the NFTs (and their details) the user (a Principal ID) owns. 

Here, DAB takes the identity you pass, and checks in every NFT collection currently on the DAB list (ICPunks, Starverse, etc...) for the individual assets the user owns (Punk#1230).

You need to pass:
- `agent`: An agent (an Http agent, instantiated with agent-js or Plug) <optional>
- `user`: A Principal object (a user's Principal ID instantiated as a principal object)

```js
import { Principal } from '@dfinity/principal';
import { getAllUserNFTs } from '@psychedelic/dab-js'
...
const getNFTCollections = async () => {
  const principal = 'r4rmh-mbkzp-gv2na-yvly3-zcp3r-ocllf-pt3p3-zsri5-6gqvr-stvs2-4ae';
  const collections = await getAllUserNFTs({
    agent,
    user: Principal.fromText(principal)
  });
}
getNFTCollections();
```

This call will return an array that includes an NFTCollection interface with the details of each NFT Collection where a user owns an NFT (name, canister id, standard, tokens).

Inside that interface the **tokens object** includes an array with each individual NFT the user owns in the collection (e.g Punk#), and its details (index, canister, id, name, url, metadata, standard, collection). This is **all the data you need to surface in the UI for your user.**

```js
const getAllUserNFTs = async ({
  agent: HttpAgent,
  user: Principal
}): Promise<Array<{
  name: string;
  canisterId: string;
  standard: string;
  icon: string;
  description: string;
  tokens: Array<{
    index: bigint;
    canister: string;
    id?: string;
    name?: string;
    url: string;
    metadata: any;
    standard: string;
    collection?: string;
  }>;
}>>
```

Here's a more detailed breakdown of each interface the array returns for clarity:

```js
interface NFTDetails {
  index: bigint;
  canister: string;
  id?: string;
  name?: string;
  url: string;
  metadata: any;
  standard: string;
  collection?: string;
}

interface NFTCollection {
  name: string;
  canisterId: string;
  standard: string;
  tokens: NFTDetails[];
  icon: string;
  description: string;
}

const getAllUserNFTs = async ({
  agent: HttpAgent,
  user: Principal
}): Promise<NFTCollection[]>
```

### 2. 🌯 Interacting with NFTs using NFTActor (getUserTokens, transfer, details)

To interact with the user's NFTs and, for example, trigger a transfer, you need to **initialize/get an NFT actor object**. This is done using the **getNFTActor** method, where you need to pass:

- `canisterID`: the Canister ID of the collection you want to interact with (e.g ICPunks)
- `agent`: and HttpAgent (instantiated with agent-js or Plug)
- `standard`: a str with the name of the NFT collection's standard (EXT, ICPunks)

> (Current standards supported and string name: EXT, ICPunks)

```js
import { getAllUserNFTs } from '@psychedelic/dab-js'

export const getNFTActor = ({
  canisterId: string,
  agent: HttpAgent,
  standard: string
}): NFT => {
  return new NFT_STANDARDS[standard](canisterId, agent);
};
```

This should return an actor object with the following interfaces.

```js
export default abstract class NFT {
  abstract standard: string;

  agent: HttpAgent;

  canisterId: string;

  constructor(canisterId: string, agent: HttpAgent) {
    this.agent = agent;
    this.canisterId = canisterId;
  }

  abstract getUserTokens(principal: Principal): Promise<NFTDetails[]>;

  abstract transfer(to: Principal, tokenIndex: number): Promise<void>;

  abstract details(tokenIndex: number): Promise<NFTDetails>;
}
```

As you can see this actor contains the **standard javascript interface** of DAB's **NFT standard wrapper**. It has generic calls to interact with NFTs regardless of their standard (as long as their interface is wrapped in the standard wrapper).

- `getUserTokens`: Fetches an array of all NFTs the passed identity owns in the collection. 
- `transfer`: Request the transfer of an NFT the user owns to another address.
- `details`: Returns the details of **any token** in the collection.


### getUserTokens - Fetch a User's Owned Tokens in a Specific Collection

This method allows you to fetch an array with the details of all the tokens a user owns in the collection you have **initialized in the actor**.

Here, you would need to pass:

- `principal`: a str of the user's Principal ID you want to check for owned NFTs.

> (See that in the variable NFTActor, we are instantiating the NFT actor object, passing a canisterID for the collection we want to interact with, an agent, and the name of the standard as a str).

```js

import { Principal } from '@dfinity/principal';
import { getNFTActor } from '@psychedelic/dab-js'

...
const getUserNFTs = async () => {
  const principal = 'r4rmh-mbkzp-gv2na-yvly3-zcp3r-ocllf-pt3p3-zsri5-6gqvr-stvs2-4ae';
  const canisterId = 'qcg3w-tyaaa-aaaah-qakea-cai';
  const standard = 'ICPunks';
  const NFTActor = getNFTActor({ canisterId, agent, standard });
  const userTokens = await NFTActor.getUserTokens(Principal.fromText(principal));
}
getUserNFTs();
```

This returns an array with the following interface, with metadata of each owned NFT:

```js
export interface NFTDetails {
  index: bigint;
  canister: string;
  id?: string;
  name?: string;
  url: string;
  metadata: any;
  standard: string;
  collection?: string;
}
```

### sendNFT - Request to Transfer a User's NFT to a Different Address

This method allows you to request the transfer of an NFT the passed identity owns in the collection you have **initialized in the actor**.

In this method you need to pass:

- `to`: a str of a Principal ID for the destination address.
- `index`: the index number of the NFT to be transferred.

> (See that in the variable NFTActor, we are instantiating the NFT actor object, passing a canisterID for the collection we want to interact with, an agent, and the name of the standard as a str).

```js
import { Principal } from '@dfinity/principal';
import { getNFTActor } from '@psychedelic/dab-js'

...
const sendNFT = async () => {
  const to = 'r4rmh-mbkzp-gv2na-yvly3-zcp3r-ocllf-pt3p3-zsri5-6gqvr-stvs2-4ae';
  const index = 5;
  const standard = 'ICPunks'
  const canisterId = 'qcg3w-tyaaa-aaaah-qakea-cai';
  const NFTActor = getNFTActor({ canisterId, agent, standard });
  await NFTActor.transfer(Principal.fromText(to), index);
}
sendNFT();
```

The transfer call, **if successful** doesn't return anything after being executed. **If the transaction fails, it will return an error**.

### getTokenDetails - Fetch the Details of Any Specific Token on a Collection.

This method allows you to fetch an array with the details and metadata of any asset on the index of the NFT collection you **initialized in the actor**.

In this method, you need to pass:

- `tokenIndex`: the index number for the token in the collection you want the details of.

> (See that in the variable NFTActor, we are instantiating the NFT actor object, passing a canisterID for the collection we want to interact with, an agent, and the name of the standard as a str).



```js
import { Principal } from '@dfinity/principal';
import { getNFTActor } from '@psychedelic/dab-js'

...
const getTokenDetails = async () => {
  const tokenIndex = 5;
  const canisterId = 'qcg3w-tyaaa-aaaah-qakea-cai';
  const standard = 'ICPunks';
  const NFTActor = getNFTActor({ canisterId, agent, standard });

  const details = await NFTActor.details(tokenIndex);
}
getTokenDetails()
```

This call returns one object with the metadata of the specific NFT queried.

---

## Canister List

These are the methods utilized to interact with the Canister List to check if a Canister ID has associated metadata in DAB, returning a metadata object you can display in your app for a better UI/UX.

### 1. 🛢️ Check a Single Canister's Metadata in the Registry (getcanisterInfo)

This method allows you to query the DAB canister registry to fetch the metadata for a **specific Canister ID**. You will need to pass:

- `canisterID`: the Canister ID of the canister you want to check in DAB.
- `agent`: and HttpAgent (instantiated with agent-js or Plug)


```ts
import { getCanisterInfo } from '@psychedelic/dab-js';
const agent = new HttpAgent();
const nnsCanisterId = 'ryjl3-tyaaa-aaaaa-aaaba-cai';
const nnsMetadata = await getCanisterInfo({ canisterId: nnsCanisterId, agent });
console.log(nnsMetadata);
```

If the Canister ID has metadata associated in the Canister Registry, it will return a **metadata object**. Else, it will return undefined.

```js
type CanisterId = Principal | string;
interface CanisterMetadata {
  url: string;
  name: string;
  description: string;
  version: number;
  logo_url: string;
}
```


### 2. 🛢️🛢️ Check Multiple Canister's Metadata in the Registry (getMultipleCanisterInfo)

This second method is a variation that allows you to query DAB to check the metadata of **multiple canisters at once**. The main differences is that you will pass:

- `canisterIDs`: An array of **several canister IDs** of the canisters you want to check in DAB.
- `agent`: and HttpAgent (instantiated with agent-js or Plug) <optional>.

```ts
import { getMultipleCanisterInfo } from '@psychedelic/dab-js';

const agent = HttpAgent();
const canisterIds = ['e3izy-jiaaa-aaaah-qacbq-cai', 'qcg3w-tyaaa-aaaah-qakea-cai']; // Cronic + ICPunks
const nftsInfo = await getMultipleCanisterInfoFromDab({ canisterIds, agent });
console.log(nftsInfo);
```


In contrast to the previous method, this will return an **array of metadata objects** for all the canister IDs you entered.

---

## Token List

### 1. Interacting with Tokens (getTokenActor, transfer, details)
To interact with the user's Tokens and, for example, trigger a transfer, you need to initialize/get an Token actor object. This is done using the **getTokenActor** method, where you need to pass:

- `canisterID`: the Canister ID of the token you want to interact with.
- `agent`: an HttpAgent (instantiated with agent-js or Plug)
- `standard`: a str with the name of the Token standard (DIP20, EXT, XTC, WICP)

**It's important to note**: without passing a template interface, you can use the following methods:

send
getMetadata
getBalance
burnXTC (in the case of XTC)

These are the common methods shared across all interfaces/standards that DAB-js wraps in its common universal interface. To **use other methods that are not shared across standards**, you can import and pass that standard's interface into the type variable of getTokenActor and use the base methods as "_method" (e.g. if transfer, do _transfer).

>(Current standards supported and string name: DIP20, EXT, XTC, WICP)

```js
import { getTokenActor } from '@psychedelic/dab-js'

export const getTokenActor = <T={}>({
  canisterId: string,
  agent: HttpAgent,
  standard: string
}): TokenActor => {
  return createTokenActor<T>(canisterID, agent, standard);
};
```
This should return an actor object with the following interfaces:

```js
export default class TokenActor {
  agent: HttpAgent;

  canisterId: string;

  constructor(canisterId: string, agent: HttpAgent) {
    this.agent = agent;
    this.canisterId = canisterId;
  }

  abstract send({to: string, from: string, amount: string}): Promise<SendResponse>;

  abstract getBalance(user: Principal): Promise<Balance>;

  abstract getMetadata(): Promise<Metadata>;

  abstract burnXTC({to: Principal, amount: string}): Promise<BurnResult>;
}
```

As you can see **this actor contains the standard javascript interface of DAB's Token standard wrapper**. It has generic calls to interact with tokens regardless of their standard (as long as their interface is wrapped in the standard wrapper).

- `send`: Request the transfer of a token balance the user owns to another address.
- `getMetadata`: Returns the details of the token.
- `getBalance`: Returns the balance of a specific user.
- `burnXTC`: Request burning XTC to transfer raw unwrapped cycles to an address.


For a more detailed breakdown of the interfaces that are returned & more info on using the `send`, `getBalance`, `getMetadata`, and `burnXTC` methods, [visit our docs](https://docs.dab.ooo/token-list/getting-started/#2-interacting-with-tokens-gettokenactor-transfer-details).

## Verified Registry Objects

Along with V1.0.0, we've added custom objects for each one of the three verified registries that make it easy to interact with the DAB Registry Standard methods (`name`, `get`, `add`, `remove`) of each registry.

Let's go over an example using the `NFTRegistry` object.

```js
import { NFTRegistry } from '@psychedelic/dab-js';

const nft_registry = new NFTRegistry();
const getId = "PRINCIPAL-ID-HERE";

const testRegistryMethods = async (registry: Registry, getId: string) => {
    const name = await registry.name();
    console.log('Registry Name: ', name);

    console.log('Getting metadata for id', getId);
    const getResponse = await registry.get(getId);
    console.log('Get Response: ', getResponse);
};

testRegistryMethods(nft_registry, getId);
```

We dont use `add` or `remove` in either of these examples because they require admin priveledges.

Using `TokenRegistry` & `CanisterRegistry` is done in the exact same way as we have just demonstrated with the `NFTRegistry`.
