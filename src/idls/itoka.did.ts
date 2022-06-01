export default ({ IDL }) => {
  const CustodianSetupReceipt = IDL.Variant({
    'Ok' : IDL.Text,
    'Err' : IDL.Text,
  });
  const Errors = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const TxReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : Errors });
  const MusicSetupReceipt = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Text),
    'Err' : Errors,
  });
  const AlbumCoverLocation = IDL.Record({
    'icp' : IDL.Text,
    'ipfs' : IDL.Text,
  });
  const Attribute = IDL.Record({
    'bpm' : IDL.Nat,
    'key' : IDL.Text,
    'backbone' : IDL.Text,
    'collection' : IDL.Text,
    'name' : IDL.Text,
    'genre' : IDL.Vec(IDL.Text),
  });
  const AudioLocation = IDL.Record({ 'icp' : IDL.Text, 'ipfs' : IDL.Text });
  const TokenMetadata__1 = IDL.Record({
    'tokenIdentifier' : IDL.Text,
    'albumCoverLocation' : AlbumCoverLocation,
    'albumCoverType' : IDL.Text,
    'rawAudioType' : IDL.Text,
    'attributes' : Attribute,
    'previewAudioType' : IDL.Text,
    'previewAudioLocation' : AudioLocation,
    'rawAudioLocation' : AudioLocation,
    'compressedAudioType' : IDL.Text,
    'compressedAudioLocation' : AudioLocation,
  });
  const Operation = IDL.Variant({
    'setStreamingRoyalty' : IDL.Null,
    'retriveDecryptionKey' : IDL.Null,
    'transferFrom' : IDL.Null,
    'setDecryptionKey' : IDL.Null,
    'setAudioCompressedSrc' : IDL.Null,
    'setAudioRawSrc' : IDL.Null,
    'retriveAudioCompressedSrc' : IDL.Null,
    'retriveAudioPreviewSrc' : IDL.Null,
    'burn' : IDL.Null,
    'approveAll' : IDL.Null,
    'setAudioPreviewSrc' : IDL.Null,
    'mint' : IDL.Opt(TokenMetadata__1),
    'approve' : IDL.Null,
    'upgrade' : IDL.Null,
    'setMetadata' : IDL.Null,
    'setTranscationFee' : IDL.Null,
    'retriveAudioRawSrc' : IDL.Null,
    'transfer' : IDL.Null,
    'revokeAll' : IDL.Null,
  });
  const Time = IDL.Int;
  const UpgradeHistory = IDL.Record({
    'upgrade_time' : Time,
    'message' : IDL.Text,
  });
  const Record = IDL.Variant({
    'transcationFee' : IDL.Nat,
    'metadata' : IDL.Opt(TokenMetadata__1),
    'user' : IDL.Principal,
    'secret' : IDL.Text,
    'commit' : UpgradeHistory,
  });
  const TxRecord = IDL.Record({
    'op' : Operation,
    'to' : Record,
    'tokenIndex' : IDL.Opt(IDL.Nat),
    'from' : Record,
    'timestamp' : Time,
    'caller' : IDL.Principal,
    'index' : IDL.Nat,
  });
  const StreamingResult = IDL.Variant({
    'AudioSrc' : IDL.Opt(IDL.Text),
    'StreamingTimes' : IDL.Nat,
  });
  const StreamingReceipt = IDL.Variant({
    'Ok' : StreamingResult,
    'Err' : Errors,
  });
  const TokenInfoExt = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Opt(TokenMetadata__1),
    'operator' : IDL.Opt(IDL.Principal),
    'timestamp' : Time,
    'index' : IDL.Nat,
  });
  const Metadata = IDL.Record({
    'owner' : IDL.Principal,
    'desc' : IDL.Text,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'created_at' : Time,
    'cycles' : IDL.Nat,
    'upgraded_at' : Time,
    'custodians' : IDL.Vec(IDL.Principal),
    'symbol' : IDL.Text,
  });
  const UserInfoExt = IDL.Record({
    'allowedTokens' : IDL.Vec(IDL.Nat),
    'tokens' : IDL.Vec(IDL.Nat),
    'operators' : IDL.Vec(IDL.Principal),
    'allowedBy' : IDL.Vec(IDL.Principal),
  });
  const TokenMetadata = IDL.Record({
    'tokenIdentifier' : IDL.Text,
    'albumCoverLocation' : AlbumCoverLocation,
    'albumCoverType' : IDL.Text,
    'rawAudioType' : IDL.Text,
    'attributes' : Attribute,
    'previewAudioType' : IDL.Text,
    'previewAudioLocation' : AudioLocation,
    'rawAudioLocation' : AudioLocation,
    'compressedAudioType' : IDL.Text,
    'compressedAudioLocation' : AudioLocation,
  });
  const MintResult = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : Errors,
  });
  const DecryptionKey = IDL.Record({
    'iv' : IDL.Text,
    'privateKey' : IDL.Text,
  });
  const DecryptionKeyReceipt = IDL.Variant({
    'Ok' : IDL.Opt(DecryptionKey),
    'Err' : Errors,
  });
  const NFToken = IDL.Service({
    'addCustodian' : IDL.Func([IDL.Principal], [CustodianSetupReceipt], []),
    'approve' : IDL.Func([IDL.Nat, IDL.Principal], [TxReceipt], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'burn' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'commit' : IDL.Func([IDL.Text], [MusicSetupReceipt], []),
    'desc' : IDL.Func([], [IDL.Text], ['query']),
    'getAllHolders' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getAllMusicSetupHistory' : IDL.Func([], [IDL.Vec(TxRecord)], ['query']),
    'getAllTokenAudioTotalStreamingAmount' : IDL.Func(
        [],
        [StreamingReceipt],
        ['query'],
      ),
    'getAllTokens' : IDL.Func([], [IDL.Vec(TokenInfoExt)], ['query']),
    'getAllUpgradeHistory' : IDL.Func([], [IDL.Vec(TxRecord)], ['query']),
    'getHolderStreamingAmount' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'getLatestMusicSetupHistory' : IDL.Func([], [TxRecord], ['query']),
    'getLatestStreamingHistory' : IDL.Func([], [TxRecord], ['query']),
    'getLatestUpgradeHistory' : IDL.Func([], [TxRecord], ['query']),
    'getMetadata' : IDL.Func([], [Metadata], ['query']),
    'getOperator' : IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    'getStreamingHistory' : IDL.Func([IDL.Nat], [TxRecord], ['query']),
    'getStreamingHistorys' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getTokenAudioCompressedStreamingAmount' : IDL.Func(
        [IDL.Nat],
        [StreamingReceipt],
        ['query'],
      ),
    'getTokenAudioPreviewStreamingAmount' : IDL.Func(
        [IDL.Nat],
        [StreamingReceipt],
        ['query'],
      ),
    'getTokenAudioRawStreamingAmount' : IDL.Func(
        [IDL.Nat],
        [StreamingReceipt],
        ['query'],
      ),
    'getTokenAudioTotalStreamingAmount' : IDL.Func(
        [IDL.Nat],
        [StreamingReceipt],
        ['query'],
      ),
    'getTokenInfo' : IDL.Func([IDL.Nat], [TokenInfoExt], ['query']),
    'getTransaction' : IDL.Func([IDL.Nat], [TxRecord], ['query']),
    'getTransactions' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getTranscationFee' : IDL.Func([], [IDL.Nat], ['query']),
    'getUserInfo' : IDL.Func([IDL.Principal], [UserInfoExt], ['query']),
    'getUserStreamingHistorys' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getUserTokens' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenInfoExt)],
        ['query'],
      ),
    'getUserTransactionAmount' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'getUserTransactions' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getUserlisteningAmount' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getUserlistenings' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'historySize' : IDL.Func([], [IDL.Nat], ['query']),
    'historySize_streaming' : IDL.Func([], [IDL.Nat], ['query']),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'logo' : IDL.Func([], [IDL.Text], ['query']),
    'mint' : IDL.Func(
        [IDL.Principal, IDL.Opt(TokenMetadata)],
        [MintResult],
        [],
      ),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    'removeCustodian' : IDL.Func([IDL.Principal], [CustodianSetupReceipt], []),
    'retriveAudioCompressedSrc' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [StreamingReceipt],
        [],
      ),
    'retriveAudioPreviewSrc' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [StreamingReceipt],
        [],
      ),
    'retriveDecryptionKey' : IDL.Func([IDL.Nat], [DecryptionKeyReceipt], []),
    'retriveRawAudioSrc' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [StreamingReceipt],
        [],
      ),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [TxReceipt], []),
    'setAudioCompressedSrc' : IDL.Func(
        [IDL.Nat, IDL.Text],
        [MusicSetupReceipt],
        [],
      ),
    'setAudioPreviewSrc' : IDL.Func(
        [IDL.Nat, IDL.Text],
        [MusicSetupReceipt],
        [],
      ),
    'setAudioRawSrc' : IDL.Func([IDL.Nat, IDL.Text], [MusicSetupReceipt], []),
    'setDecryptionKey' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text],
        [MusicSetupReceipt],
        [],
      ),
    'setTokenMetadata' : IDL.Func([IDL.Nat, TokenMetadata], [TxReceipt], []),
    'setTranscationFee' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
    'who_are_custodians' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
  });
  return NFToken;
};
export const init = ({ IDL }) => {
  return [
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Principal,
    IDL.Opt(IDL.Nat),
  ];
};
