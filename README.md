# ⚗️ DAB-js - A Library to Integrate & Interact with DAB

![](https://storageapi.fleek.co/nicopoggi-team-bucket/dab-gh-nft.png)

This is a JS library that wraps all necessary methods to integrate [DAB's registries/list](https://dab.ooo/), starting with its NFTs List into applications, websites, or other Internet Computer experiences. It includes:

- Simple method to query all entries in DAB's NFT List canister.
- A standard wrapper that unifies all NFT standards (EXT, ICPunks, etc...) under a common interface.

## 🤔 What is DAB and its NFT list? 

DAB is an open internet service for data registries. In V0.1.0 it provides a list of NFTs that apps & developers can **consume to surface new NFTs as they are listed in DAB, instead of manually adding them one by one**.

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