import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AlbumCoverLocation { 'icp' : string, 'ipfs' : string }
export interface Attribute {
  'bpm' : bigint,
  'key' : string,
  'backbone' : string,
  'collection' : string,
  'name' : string,
  'genre' : Array<string>,
}
export interface AudioLocation { 'icp' : string, 'ipfs' : string }
export type CustodianSetupReceipt = { 'Ok' : string } |
  { 'Err' : string };
export interface DecryptionKey { 'iv' : string, 'privateKey' : string }
export type DecryptionKeyReceipt = { 'Ok' : [] | [DecryptionKey] } |
  { 'Err' : Errors };
export type Errors = { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export interface Metadata {
  'owner' : Principal,
  'desc' : string,
  'logo' : string,
  'name' : string,
  'totalSupply' : bigint,
  'created_at' : Time,
  'cycles' : bigint,
  'upgraded_at' : Time,
  'custodians' : Array<Principal>,
  'symbol' : string,
}
export type MintResult = { 'Ok' : [bigint, bigint] } |
  { 'Err' : Errors };
export type MusicSetupReceipt = { 'Ok' : [bigint, string] } |
  { 'Err' : Errors };
export interface NFToken {
  'addCustodian' : ActorMethod<[Principal], CustodianSetupReceipt>,
  'approve' : ActorMethod<[bigint, Principal], TxReceipt>,
  'availableCycles' : ActorMethod<[], bigint>,
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burn' : ActorMethod<[bigint], TxReceipt>,
  'commit' : ActorMethod<[string], MusicSetupReceipt>,
  'desc' : ActorMethod<[], string>,
  'getAllHolders' : ActorMethod<[], Array<Principal>>,
  'getAllMusicSetupHistory' : ActorMethod<[], Array<TxRecord>>,
  'getAllTokenAudioTotalStreamingAmount' : ActorMethod<[], StreamingReceipt>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getAllUpgradeHistory' : ActorMethod<[], Array<TxRecord>>,
  'getHolderStreamingAmount' : ActorMethod<[Principal], bigint>,
  'getLatestMusicSetupHistory' : ActorMethod<[], TxRecord>,
  'getLatestStreamingHistory' : ActorMethod<[], TxRecord>,
  'getLatestUpgradeHistory' : ActorMethod<[], TxRecord>,
  'getMetadata' : ActorMethod<[], Metadata>,
  'getOperator' : ActorMethod<[bigint], Principal>,
  'getStreamingHistory' : ActorMethod<[bigint], TxRecord>,
  'getStreamingHistorys' : ActorMethod<[bigint, bigint], Array<TxRecord>>,
  'getTokenAudioCompressedStreamingAmount' : ActorMethod<
    [bigint],
    StreamingReceipt,
  >,
  'getTokenAudioPreviewStreamingAmount' : ActorMethod<
    [bigint],
    StreamingReceipt,
  >,
  'getTokenAudioRawStreamingAmount' : ActorMethod<[bigint], StreamingReceipt>,
  'getTokenAudioTotalStreamingAmount' : ActorMethod<[bigint], StreamingReceipt>,
  'getTokenInfo' : ActorMethod<[bigint], TokenInfoExt>,
  'getTransaction' : ActorMethod<[bigint], TxRecord>,
  'getTransactions' : ActorMethod<[bigint, bigint], Array<TxRecord>>,
  'getTranscationFee' : ActorMethod<[], bigint>,
  'getUserInfo' : ActorMethod<[Principal], UserInfoExt>,
  'getUserStreamingHistorys' : ActorMethod<
    [Principal, bigint, bigint],
    Array<TxRecord>,
  >,
  'getUserTokens' : ActorMethod<[Principal], Array<TokenInfoExt>>,
  'getUserTransactionAmount' : ActorMethod<[Principal], bigint>,
  'getUserTransactions' : ActorMethod<
    [Principal, bigint, bigint],
    Array<TxRecord>,
  >,
  'getUserlisteningAmount' : ActorMethod<[Principal], bigint>,
  'getUserlistenings' : ActorMethod<
    [Principal, bigint, bigint],
    Array<TxRecord>,
  >,
  'historySize' : ActorMethod<[], bigint>,
  'historySize_streaming' : ActorMethod<[], bigint>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], boolean>,
  'logo' : ActorMethod<[], string>,
  'mint' : ActorMethod<[Principal, [] | [TokenMetadata]], MintResult>,
  'name' : ActorMethod<[], string>,
  'ownerOf' : ActorMethod<[bigint], Principal>,
  'removeCustodian' : ActorMethod<[Principal], CustodianSetupReceipt>,
  'retriveAudioCompressedSrc' : ActorMethod<
    [bigint, Principal],
    StreamingReceipt,
  >,
  'retriveAudioPreviewSrc' : ActorMethod<[bigint, Principal], StreamingReceipt>,
  'retriveDecryptionKey' : ActorMethod<[bigint], DecryptionKeyReceipt>,
  'retriveRawAudioSrc' : ActorMethod<[bigint, Principal], StreamingReceipt>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], TxReceipt>,
  'setAudioCompressedSrc' : ActorMethod<[bigint, string], MusicSetupReceipt>,
  'setAudioPreviewSrc' : ActorMethod<[bigint, string], MusicSetupReceipt>,
  'setAudioRawSrc' : ActorMethod<[bigint, string], MusicSetupReceipt>,
  'setDecryptionKey' : ActorMethod<[bigint, string, string], MusicSetupReceipt>,
  'setTokenMetadata' : ActorMethod<[bigint, TokenMetadata], TxReceipt>,
  'setTranscationFee' : ActorMethod<[bigint], TxReceipt>,
  'symbol' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
  'who_are_custodians' : ActorMethod<[], Array<Principal>>,
}
export type Operation = { 'setStreamingRoyalty' : null } |
  { 'retriveDecryptionKey' : null } |
  { 'transferFrom' : null } |
  { 'setDecryptionKey' : null } |
  { 'setAudioCompressedSrc' : null } |
  { 'setAudioRawSrc' : null } |
  { 'retriveAudioCompressedSrc' : null } |
  { 'retriveAudioPreviewSrc' : null } |
  { 'burn' : null } |
  { 'approveAll' : null } |
  { 'setAudioPreviewSrc' : null } |
  { 'mint' : [] | [TokenMetadata__1] } |
  { 'approve' : null } |
  { 'upgrade' : null } |
  { 'setMetadata' : null } |
  { 'setTranscationFee' : null } |
  { 'retriveAudioRawSrc' : null } |
  { 'transfer' : null } |
  { 'revokeAll' : null };
export type Record = { 'transcationFee' : bigint } |
  { 'metadata' : [] | [TokenMetadata__1] } |
  { 'user' : Principal } |
  { 'secret' : string } |
  { 'commit' : UpgradeHistory };
export type StreamingReceipt = { 'Ok' : StreamingResult } |
  { 'Err' : Errors };
export type StreamingResult = { 'AudioSrc' : [] | [string] } |
  { 'StreamingTimes' : bigint };
export type Time = bigint;
export interface TokenInfoExt {
  'owner' : Principal,
  'metadata' : [] | [TokenMetadata__1],
  'operator' : [] | [Principal],
  'timestamp' : Time,
  'index' : bigint,
}
export interface TokenMetadata {
  'tokenIdentifier' : string,
  'albumCoverLocation' : AlbumCoverLocation,
  'albumCoverType' : string,
  'rawAudioType' : string,
  'attributes' : Attribute,
  'previewAudioType' : string,
  'previewAudioLocation' : AudioLocation,
  'rawAudioLocation' : AudioLocation,
  'compressedAudioType' : string,
  'compressedAudioLocation' : AudioLocation,
}
export interface TokenMetadata__1 {
  'tokenIdentifier' : string,
  'albumCoverLocation' : AlbumCoverLocation,
  'albumCoverType' : string,
  'rawAudioType' : string,
  'attributes' : Attribute,
  'previewAudioType' : string,
  'previewAudioLocation' : AudioLocation,
  'rawAudioLocation' : AudioLocation,
  'compressedAudioType' : string,
  'compressedAudioLocation' : AudioLocation,
}
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : Errors };
export interface TxRecord {
  'op' : Operation,
  'to' : Record,
  'tokenIndex' : [] | [bigint],
  'from' : Record,
  'timestamp' : Time,
  'caller' : Principal,
  'index' : bigint,
}
export interface UpgradeHistory { 'upgrade_time' : Time, 'message' : string }
export interface UserInfoExt {
  'allowedTokens' : Array<bigint>,
  'tokens' : Array<bigint>,
  'operators' : Array<Principal>,
  'allowedBy' : Array<Principal>,
}
export default interface _SERVICE extends NFToken {}
