# ⚗️ DAB-js - A Library to Integrate & Interact with DAB

![](https://storageapi.fleek.co/nicopoggi-team-bucket/dab-gh-nft.png)

This is a JS library that wraps several necessary methods to integrate [DAB's registries/list](https://dab.ooo/), starting with its NFTs List into applications, websites, or other Internet Computer experiences. It includes:

- Simple method to query an identity's owned NFTs in listed NFT collections.
- A standard wrapper that unifies several NFT standards (EXT, ICPunks, etc...) under a common interface.

## 🤔 What is DAB and its NFT list? 

DAB is an open internet service for data registries. In V0.1.0 it provides a list of NFTs that apps & developers can **consume to auto-surface a user's owned NFTs from multiple collections, and support new NFT collections as they are listed in DAB, instead of manually adding them one by one**.

- [DAB's website](https://docs.dab.ooo)
- [DAB's main repository](https://github.com/psychedelic/dab)
- [DAB's documentation](https://docs.dab.ooo)

## 🌯 DAB-js and its Standard Wrapper

DAB's NFT list is **standard agnostic**, meaning any NFT collection can be listed regardless of the NFT standard interface utilized (EXT, ICpunks, Departure Labs, etc...). 

When integrating and consuming DAB's list, this would quickly become a problem for developers that need to **use different methods, depending on the standard, to do a simple thing like transferring an NFT**.

**We solved this with the DAB-js library and its standard wrapper.** DAB-js provides a common javascript interface with standard methods (transfer, getUserTokens, details, etc..) that the developer can use to make calls to any NFT in any collection. **DAB's standard wrapper translates the call** to match the appropiate methods of each standards.

### Wrapped Standards & New Additions

Currently, DAB-js wraps the following standards. **Developers are welcome to open PRs to suggest/help integrate new standards to DAB-js**.

- [EXT NFT Standard](https://github.com/Toniq-Labs/extendable-token)
- [ICPunks NFT Standard](https://github.com/stopak/ICPunks/blob/dev/service/icpunks_rust.did)

More standards will be wrapped as NFT collections following those standards are added to DAB's NFT list. Our next short term goal is supporting the [Departure Labs NFT standard](https://github.com/DepartureLabsIC/non-fungible-token).

## 🧰 Interaction guide

To pull and install from [@Psychedelic](https://github.com/psychedelic) via the NPM CLI, you'll need:

- A Github account
- A Github personal access token (you can create a personal acess token [here](https://github.com/settings/tokens))
- The personal access token with the correct scopes, **repo** and **read:packages** to be granted access to the [GitHub Package Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
- Authentication via `npm login`, using your Github email for the **username** and the **personal access token** as your **password**:

Once you have those ready, run:

```
npm login --registry=https://npm.pkg.github.com --scope=@Psychedelic
```

> **Note:** You only need to configure this once to install the package!
    On npm login provide your Github email as your username and the Personal access token as the password.

You can also setup your npm global settings to fetch from the Github registry everytime it finds a **@Psychdelic** package, find the instructions [here](https://docs.npmjs.com/configuring-your-registry-settings-as-an-npm-enterprise-user).

⚠️ Alternatively, a token could be passed to the `.npmrc` as `//npm.pkg.github.com/:_authToken=xxxxxx` but we'd like to keep it clean and tokenless.

## 1. ⚙️ Setting up DAB-js in your project

First, you need to install the DAB-js **npm package** into your project.

You can do so from the command line:
```js
npm install @psychedelic/dab-js@latest
```

Find more details about installing versions in the package page [here](https://github.com/Psychedelic/DAB-js/packages/987540)

## 2. 🎨 Fetching All NFTs the User Owns (getAllUserNFTs)

In this step, you will use the getAllUserNFTs method to get an array with all the NFTs (and their details) the user (a Principal ID) owns. 

Here, DAB takes the identity you pass, and checks in every NFT collection currently on the DAB list (ICPunks, Starverse, etc...) for the individual assets the user owns (Punk#1230).

You need to pass:
- An agent (an Http agent, instantiated with agent-js or Plug)
- A Principal object (a user's Principal ID instantiated as a principal object)

```js
import { Principal } from '@dfinity/principal';
import { getAllUserNFTs } from '@psychedelic/dab-js'
...
const getNFTCollections = async () => {
  const principal = 'r4rmh-mbkzp-gv2na-yvly3-zcp3r-ocllf-pt3p3-zsri5-6gqvr-stvs2-4ae';
  const collections = await getAllUserNFTs(
    agent,
    Principal.fromText(principal)
  );
}
getNFTCollections();
```

This call will return an array that includes an NFTCollection interface with the details of each NFT Collection where a user owns an NFT (name, canister id, standard, tokens).

Inside that interface the **tokens object** includes an array with each individual NFT the user owns in the collection (e.g Punk#), and its details (index, canister, id, name, url, metadata, standard, collection). This is **all the data you need to surface in the UI for your user.**

```js
const getAllUserNFTs = async (
  agent: HttpAgent,
  user: Principal
): Promise<Array<{
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

const getAllUserNFTs = async (
  agent: HttpAgent,
  user: Principal
): Promise<NFTCollection[]>
```

## 3. 🌯 Interacting with NFTs using NFTActor (getUserTokens, transfer, details)

To interact with the user's NFTs and, for example, trigger a transfer, you need to **initialize/get an NFT actor object**. This is done using the **getNFTActor** method, where you need to pass:

- `canisterID`: the Canister ID of the collection you want to interact with (e.g ICPunks)
- `agent`: and HttpAgent (instantiated with agent-js or Plug)
- `standard`: a str with the name of the NFT collection's standard (EXT, ICPunks)

> (Current standards supported and string name: EXT, ICPunks)

```js
import { getAllUserNFTs } from '@psychedelic/dab-js'

export const getNFTActor = (
  canisterId: string,
  agent: HttpAgent,
  standard: string
): NFT => {
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
  const NFTActor = getNFTActor(canisterId, agent, standard);
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
  const NFTActor = getNFTActor(canisterId, agent, standard);
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
  const NFTActor = getNFTActor(canisterId, agent, standard);

  const details = await NFTActor.details(tokenIndex);
}
getTokenDetails()
```

This call returns one object with the metadata of the specific NFT queried.
