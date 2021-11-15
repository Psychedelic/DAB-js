/* eslint-disable @typescript-eslint/naming-convention */
export default ({ IDL }) => {
  const CandyValue = IDL.Rec();
  const Property__1 = IDL.Rec();
  const Query = IDL.Rec();
  const Update = IDL.Rec();
  const CodeLine = IDL.Record({
    order: IDL.Nat,
    line: IDL.Text,
    lineNumber: IDL.Nat,
    nftID: IDL.Opt(IDL.Text),
    image: IDL.Vec(IDL.Vec(IDL.Nat8)),
    isNFT: IDL.Bool,
    sourceImage: IDL.Nat,
  });
  const AuthorizeRequest = IDL.Record({
    p: IDL.Principal,
    id: IDL.Text,
    isAuthorized: IDL.Bool,
  });
  const Error = IDL.Variant({
    Immutable: IDL.Null,
    NotFound: IDL.Null,
    Unauthorized: IDL.Null,
    Restricted: IDL.Null,
    InvalidRequest: IDL.Null,
    AuthorizedPrincipalLimitReached: IDL.Nat,
  });
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: Error });
  const TokenIdentifier__1 = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const User = IDL.Variant({
    principal: IDL.Principal,
    address: AccountIdentifier,
  });
  const BalanceRequest = IDL.Record({
    token: TokenIdentifier__1,
    user: User,
  });
  const Balance = IDL.Nat;
  const CommonError__1 = IDL.Variant({
    InvalidToken: TokenIdentifier__1,
    Other: IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    ok: Balance,
    err: CommonError__1,
  });
  const TokenIdentifier = IDL.Text;
  const EXTAccountIdentifier = IDL.Text;
  const CommonError = IDL.Variant({
    InvalidToken: TokenIdentifier__1,
    Other: IDL.Text,
  });
  const Result_10 = IDL.Variant({
    ok: EXTAccountIdentifier,
    err: CommonError,
  });
  const Property = IDL.Record({
    value: CandyValue,
    name: IDL.Text,
    immutable: IDL.Bool,
  });
  CandyValue.fill(
    IDL.Variant({
      Int: IDL.Int,
      Nat: IDL.Nat,
      Empty: IDL.Null,
      Nat16: IDL.Nat16,
      Nat32: IDL.Nat32,
      Nat64: IDL.Nat64,
      Blob: IDL.Vec(IDL.Nat8),
      Bool: IDL.Bool,
      Int8: IDL.Int8,
      Nat8: IDL.Nat8,
      Text: IDL.Text,
      Bytes: IDL.Variant({
        thawed: IDL.Vec(IDL.Nat8),
        frozen: IDL.Vec(IDL.Nat8),
      }),
      Int16: IDL.Int16,
      Int32: IDL.Int32,
      Int64: IDL.Int64,
      Option: IDL.Opt(CandyValue),
      Floats: IDL.Variant({
        thawed: IDL.Vec(IDL.Float64),
        frozen: IDL.Vec(IDL.Float64),
      }),
      Float: IDL.Float64,
      Principal: IDL.Principal,
      Array: IDL.Variant({
        thawed: IDL.Vec(CandyValue),
        frozen: IDL.Vec(CandyValue),
      }),
      Class: IDL.Vec(Property),
    })
  );
  const AddressedChunk = IDL.Tuple(IDL.Nat, IDL.Nat, CandyValue);
  const AddressedChunkArray = IDL.Vec(AddressedChunk);
  const CandyValue__1 = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Empty: IDL.Null,
    Nat16: IDL.Nat16,
    Nat32: IDL.Nat32,
    Nat64: IDL.Nat64,
    Blob: IDL.Vec(IDL.Nat8),
    Bool: IDL.Bool,
    Int8: IDL.Int8,
    Nat8: IDL.Nat8,
    Text: IDL.Text,
    Bytes: IDL.Variant({
      thawed: IDL.Vec(IDL.Nat8),
      frozen: IDL.Vec(IDL.Nat8),
    }),
    Int16: IDL.Int16,
    Int32: IDL.Int32,
    Int64: IDL.Int64,
    Option: IDL.Opt(CandyValue),
    Floats: IDL.Variant({
      thawed: IDL.Vec(IDL.Float64),
      frozen: IDL.Vec(IDL.Float64),
    }),
    Float: IDL.Float64,
    Principal: IDL.Principal,
    Array: IDL.Variant({
      thawed: IDL.Vec(CandyValue),
      frozen: IDL.Vec(CandyValue),
    }),
    Class: IDL.Vec(Property),
  });
  const Result_9 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const CandyProperty = IDL.Record({
    value: CandyValue,
    name: IDL.Text,
    immutable: IDL.Bool,
  });
  const Extension = IDL.Text;
  const ContractInfo = IDL.Record({
    nft_payload_size: IDL.Nat,
    memory_size: IDL.Nat,
    max_live_size: IDL.Nat,
    cycles: IDL.Nat,
    availableNFTs: IDL.Nat,
    lastTimeAwarded: IDL.Int,
    total_minted: IDL.Nat,
    currentFee: IDL.Nat,
    heap_size: IDL.Nat,
    authorized_users: IDL.Vec(IDL.Principal),
  });
  const TopupCallback = IDL.Func([], [], []);
  const Contract = IDL.Variant({
    ContractAuthorize: IDL.Record({
      isAuthorized: IDL.Bool,
      user: IDL.Principal,
    }),
    Mint: IDL.Record({ id: IDL.Text, owner: IDL.Principal }),
  });
  const Token = IDL.Variant({
    Authorize: IDL.Record({
      id: IDL.Text,
      isAuthorized: IDL.Bool,
      user: IDL.Principal,
    }),
    Transfer: IDL.Record({
      id: IDL.Text,
      to: IDL.Principal,
      from: IDL.Principal,
    }),
  });
  const Message = IDL.Record({
    topupCallback: TopupCallback,
    createdAt: IDL.Int,
    topupAmount: IDL.Nat,
    event: IDL.Variant({ ContractEvent: Contract, TokenEvent: Token }),
  });
  const Callback = IDL.Func([Message], [], []);
  const CallbackStatus = IDL.Record({
    failedCalls: IDL.Nat,
    failedCallsLimit: IDL.Nat,
    callback: IDL.Opt(Callback),
    noTopupCallLimit: IDL.Nat,
    callsSinceLastTopup: IDL.Nat,
  });
  const ContractMetadata = IDL.Record({
    name: IDL.Text,
    symbol: IDL.Text,
  });
  const Properties = IDL.Vec(Property);
  const Token__1 = IDL.Record({
    contentType: IDL.Text,
    createdAt: IDL.Int,
    properties: Properties,
    isPrivate: IDL.Bool,
    payload: IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const Request = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    key: IDL.Text,
    index: IDL.Nat,
    content_encoding: IDL.Text,
  });
  const StreamingCallbackResponse = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken),
    body: IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
    [StreamingCallbackToken],
    [StreamingCallbackResponse],
    ['query']
  );
  const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: StreamingCallbackToken,
      callback: StreamingCallback,
    }),
  });
  const Response = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16,
  });
  const Egg = IDL.Record({
    contentType: IDL.Text,
    owner: IDL.Opt(IDL.Principal),
    properties: Properties,
    desiredID: IDL.Opt(IDL.Text),
    isPrivate: IDL.Bool,
    payload: IDL.Variant({
      StagedData: IDL.Null,
      Payload: IDL.Vec(IDL.Nat8),
    }),
  });
  const MintRequest = IDL.Record({
    to: User,
    metadata: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_8 = IDL.Variant({ ok: IDL.Principal, err: Error });
  const Result_7 = IDL.Variant({ ok: IDL.Vec(IDL.Text), err: Error });
  Query.fill(IDL.Record({ name: IDL.Text, next: IDL.Vec(Query) }));
  const QueryMode = IDL.Variant({ All: IDL.Null, Some: IDL.Vec(Query) });
  const QueryRequest = IDL.Record({ id: IDL.Text, mode: QueryMode });
  const Result = IDL.Variant({ ok: Properties, err: Error });
  const Result_6 = IDL.Variant({
    ok: IDL.Tuple(IDL.Nat, IDL.Vec(IDL.Text)),
    err: IDL.Text,
  });
  const Result_5 = IDL.Variant({ ok: IDL.Bool, err: IDL.Text });
  const Chunk = IDL.Record({
    data: IDL.Vec(IDL.Nat8),
    totalPages: IDL.Nat,
    nextPage: IDL.Opt(IDL.Nat),
  });
  const PayloadResult = IDL.Variant({
    Complete: IDL.Vec(IDL.Nat8),
    Chunk: Chunk,
  });
  const PublicToken = IDL.Record({
    id: IDL.Text,
    contentType: IDL.Text,
    owner: IDL.Principal,
    createdAt: IDL.Int,
    properties: Properties,
    payload: PayloadResult,
  });
  const Result_4 = IDL.Variant({ ok: PublicToken, err: Error });
  const Result_3 = IDL.Variant({ ok: Chunk, err: Error });
  const Value = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Empty: IDL.Null,
    Bool: IDL.Bool,
    Text: IDL.Text,
    Float: IDL.Float64,
    Principal: IDL.Principal,
    Class: IDL.Vec(Property__1),
  });
  Property__1.fill(
    IDL.Record({ value: Value, name: IDL.Text, immutable: IDL.Bool })
  );
  const Metadata = IDL.Record({
    id: IDL.Text,
    contentType: IDL.Text,
    owner: IDL.Principal,
    createdAt: IDL.Int,
    properties: IDL.Vec(Property__1),
  });
  const Result_2 = IDL.Variant({ ok: Metadata, err: Error });
  const UpdateEventCallback = IDL.Variant({
    Set: Callback,
    Remove: IDL.Null,
  });
  const UpdateMode = IDL.Variant({
    Set: CandyValue,
    Next: IDL.Vec(Update),
  });
  Update.fill(IDL.Record({ mode: UpdateMode, name: IDL.Text }));
  const UpdateRequest = IDL.Record({
    id: IDL.Text,
    update: IDL.Vec(Update),
  });
  return IDL.Service({
    __updateLicense: IDL.Func([IDL.Nat, IDL.Opt(IDL.Text)], [IDL.Bool], []),
    addCodeLine: IDL.Func([CodeLine], [IDL.Bool], []),
    adminClaim: IDL.Func([IDL.Nat, IDL.Text], [IDL.Bool], []),
    adminGiveCycles: IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    authorize: IDL.Func([AuthorizeRequest], [Result_1], []),
    balance: IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    balanceOf: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Text)], ['query']),
    bearer: IDL.Func([TokenIdentifier], [Result_10], ['query']),
    boolToBytes: IDL.Func([IDL.Bool], [IDL.Vec(IDL.Nat8)], ['query']),
    byteBufferChunksToValueUnstableBufferDataZone: IDL.Func(
      [IDL.Vec(IDL.Vec(IDL.Nat8))],
      [AddressedChunkArray],
      ['query']
    ),
    byteBufferDataZoneToBuffer: IDL.Func(
      [AddressedChunkArray],
      [IDL.Vec(IDL.Vec(IDL.Nat8))],
      ['query']
    ),
    bytesToBool: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], ['query']),
    bytesToInt: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Int], ['query']),
    bytesToNat: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat], ['query']),
    bytesToNat16: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat16], ['query']),
    bytesToNat32: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat32], ['query']),
    bytesToNat64: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat64], ['query']),
    bytesToPrincipal: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Principal], ['query']),
    bytesToText: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], ['query']),
    changeOwner: IDL.Func([IDL.Text], [], []),
    clear102: IDL.Func([], [IDL.Bool], []),
    clearCodeLines: IDL.Func([], [IDL.Bool], []),
    clearNFTs: IDL.Func([], [IDL.Bool], []),
    cloneValueUnstable: IDL.Func([CandyValue__1], [CandyValue__1], ['query']),
    collect_share: IDL.Func([IDL.Text, IDL.Opt(IDL.Nat)], [Result_9], []),
    countAddressedChunksInWorkspace: IDL.Func(
      [AddressedChunkArray],
      [IDL.Nat],
      ['query']
    ),
    creditBalanceOf: IDL.Func([IDL.Text], [IDL.Opt(IDL.Nat)], ['query']),
    cyclesBalanceOf: IDL.Func([IDL.Text], [IDL.Opt(IDL.Nat)], ['query']),
    destabalizeProperty: IDL.Func([CandyProperty], [CandyProperty], ['query']),
    destabalizeValue: IDL.Func([CandyValue__1], [CandyValue__1], ['query']),
    destabalizeValueArray: IDL.Func(
      [IDL.Vec(CandyValue__1)],
      [IDL.Vec(CandyValue__1)],
      ['query']
    ),
    emptyWorkspace: IDL.Func([], [AddressedChunkArray], ['query']),
    extensions: IDL.Func([], [IDL.Vec(Extension)], ['query']),
    fileAddressedChunks: IDL.Func(
      [AddressedChunkArray, AddressedChunkArray],
      [AddressedChunkArray],
      ['query']
    ),
    flattenAddressedChunkArray: IDL.Func(
      [AddressedChunkArray],
      [IDL.Vec(IDL.Nat8)],
      ['query']
    ),
    forceCodeUpdate: IDL.Func([], [], []),
    fromAddressedChunks: IDL.Func(
      [AddressedChunkArray],
      [AddressedChunkArray],
      ['query']
    ),
    getAddressedChunkArraySize: IDL.Func(
      [AddressedChunkArray],
      [IDL.Nat],
      ['query']
    ),
    getAuthorized: IDL.Func([IDL.Text], [IDL.Vec(IDL.Principal)], ['query']),
    getClassProperty: IDL.Func(
      [CandyValue__1, IDL.Text],
      [CandyProperty],
      ['query']
    ),
    getCode: IDL.Func([], [IDL.Text], ['query']),
    getCodeLines: IDL.Func([], [IDL.Vec(CodeLine)], ['query']),
    getContractInfo: IDL.Func([], [ContractInfo], ['query']),
    getCurrentLog: IDL.Func([], [IDL.Vec(CandyValue__1)], []),
    getDataChunkFromAddressedChunkArray: IDL.Func(
      [AddressedChunkArray, IDL.Nat, IDL.Nat],
      [CandyValue__1],
      ['query']
    ),
    getDataZoneSize: IDL.Func([AddressedChunkArray], [IDL.Nat], ['query']),
    getDefaultAccountID: IDL.Func([], [IDL.Text], ['query']),
    getEventCallbackStatus: IDL.Func([], [CallbackStatus], []),
    getFeeInfo: IDL.Func([], [IDL.Nat, IDL.Nat, IDL.Nat], ['query']),
    getLogHistory: IDL.Func([IDL.Nat], [IDL.Vec(CandyValue__1), IDL.Nat], []),
    getMetadata: IDL.Func([], [ContractMetadata], ['query']),
    getNFTs: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(
            IDL.Text,
            IDL.Tuple(IDL.Opt(IDL.Principal), IDL.Vec(IDL.Principal)),
            Token__1
          )
        ),
      ],
      ['query']
    ),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    getTargetAccount: IDL.Func([], [IDL.Text], ['query']),
    getTotalMinted: IDL.Func([], [IDL.Nat], ['query']),
    getValueSize: IDL.Func([CandyValue__1], [IDL.Nat], ['query']),
    getValueUnstableSize: IDL.Func([CandyValue__1], [IDL.Nat], ['query']),
    getWorkspaceChunk: IDL.Func(
      [AddressedChunkArray, IDL.Nat, IDL.Nat],
      [IDL.Variant({ eof: IDL.Null, chunk: IDL.Null }), AddressedChunkArray],
      ['query']
    ),
    getWorkspaceChunkSize: IDL.Func(
      [AddressedChunkArray, IDL.Nat],
      [IDL.Nat],
      ['query']
    ),
    http_request: IDL.Func([Request], [Response], ['query']),
    http_request_streaming_callback: IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query']
    ),
    initDataZone: IDL.Func([CandyValue__1], [AddressedChunkArray], ['query']),
    initNFTs: IDL.Func([ContractMetadata], [], []),
    initWorkspace: IDL.Func([IDL.Nat], [AddressedChunkArray], ['query']),
    intToBytes: IDL.Func([IDL.Int], [IDL.Vec(IDL.Nat8)], ['query']),
    isAuthorized: IDL.Func([IDL.Text, IDL.Principal], [IDL.Bool], ['query']),
    mint: IDL.Func([Egg], [IDL.Text], []),
    mintNFT: IDL.Func([MintRequest], [], []),
    nat16ToBytes: IDL.Func([IDL.Nat16], [IDL.Vec(IDL.Nat8)], ['query']),
    nat32ToBytes: IDL.Func([IDL.Nat32], [IDL.Vec(IDL.Nat8)], ['query']),
    nat64ToBytes: IDL.Func([IDL.Nat64], [IDL.Vec(IDL.Nat8)], ['query']),
    natToBytes: IDL.Func([IDL.Nat], [IDL.Vec(IDL.Nat8)], ['query']),
    nftStreamingCallback: IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query']
    ),
    ownerOf: IDL.Func([IDL.Text], [Result_8], ['query']),
    owns: IDL.Func([], [Result_7], ['query']),
    principalToBytes: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat8)], ['query']),
    queryProperties: IDL.Func([QueryRequest], [Result], ['query']),
    redeemAndClaim: IDL.Func([IDL.Opt(IDL.Nat64), IDL.Bool], [Result_6], []),
    restrict: IDL.Func([IDL.Text, IDL.Bool], [Result_5], []),
    stabalizeProperty: IDL.Func([CandyProperty], [CandyProperty], ['query']),
    stabalizeValue: IDL.Func([CandyValue__1], [CandyValue__1], ['query']),
    stabalizeValueArray: IDL.Func(
      [IDL.Vec(CandyValue__1)],
      [IDL.Vec(CandyValue__1)],
      ['query']
    ),
    stabalizeValueBuffer: IDL.Func(
      [AddressedChunkArray],
      [IDL.Vec(CandyValue__1)],
      ['query']
    ),
    staticStreamingCallback: IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query']
    ),
    submit_kyc: IDL.Func([IDL.Text, IDL.Text], [Result_5], []),
    textToByteBuffer: IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat8)], ['query']),
    textToBytes: IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat8)], ['query']),
    tokenByIndex: IDL.Func([IDL.Text], [Result_4], []),
    tokenChunkByIndex: IDL.Func([IDL.Text, IDL.Nat], [Result_3], []),
    tokenMetadataByIndex: IDL.Func([IDL.Text], [Result_2], []),
    transfer: IDL.Func([IDL.Principal, IDL.Text], [Result_1], []),
    unwrapOptionValue: IDL.Func([CandyValue__1], [CandyValue__1], ['query']),
    unwrapOptionValueUnstable: IDL.Func(
      [CandyValue__1],
      [CandyValue__1],
      ['query']
    ),
    updateAramakmeLMCanister: IDL.Func([IDL.Text], [], []),
    updateBaseFee: IDL.Func([IDL.Nat], [], []),
    updateCandyLMCanister: IDL.Func([IDL.Text], [], []),
    updateContractOwners: IDL.Func([IDL.Principal, IDL.Bool], [Result_1], []),
    updateCurrentFee: IDL.Func([IDL.Nat], [], []),
    updateEventCallback: IDL.Func([UpdateEventCallback], [], []),
    updateKYCRequired: IDL.Func([IDL.Bool], [], []),
    updateKYCServer: IDL.Func([IDL.Text], [], []),
    updateLastTimeAwarded: IDL.Func([], [], []),
    updateLedgerProxy: IDL.Func([IDL.Text], [], []),
    updateMinCycles: IDL.Func([IDL.Nat], [], []),
    updateProperties: IDL.Func([UpdateRequest], [Result], []),
    updateTargetAccount: IDL.Func([IDL.Text], [], []),
    valueToBlob: IDL.Func([CandyValue__1], [IDL.Vec(IDL.Nat8)], ['query']),
    valueToBool: IDL.Func([CandyValue__1], [IDL.Bool], ['query']),
    valueToBytes: IDL.Func([CandyValue__1], [IDL.Vec(IDL.Nat8)], ['query']),
    valueToFloat: IDL.Func([CandyValue__1], [IDL.Float64], ['query']),
    valueToInt: IDL.Func([CandyValue__1], [IDL.Int], ['query']),
    valueToInt16: IDL.Func([CandyValue__1], [IDL.Int16], ['query']),
    valueToInt32: IDL.Func([CandyValue__1], [IDL.Int32], ['query']),
    valueToInt64: IDL.Func([CandyValue__1], [IDL.Int64], ['query']),
    valueToInt8: IDL.Func([CandyValue__1], [IDL.Int8], ['query']),
    valueToNat: IDL.Func([CandyValue__1], [IDL.Nat], ['query']),
    valueToNat16: IDL.Func([CandyValue__1], [IDL.Nat16], ['query']),
    valueToNat32: IDL.Func([CandyValue__1], [IDL.Nat32], ['query']),
    valueToNat64: IDL.Func([CandyValue__1], [IDL.Nat64], ['query']),
    valueToNat8: IDL.Func([CandyValue__1], [IDL.Nat8], ['query']),
    valueToText: IDL.Func([CandyValue__1], [IDL.Text], ['query']),
    valueUnstableToBlob: IDL.Func(
      [CandyValue__1],
      [IDL.Vec(IDL.Nat8)],
      ['query']
    ),
    valueUnstableToBool: IDL.Func([CandyValue__1], [IDL.Bool], ['query']),
    valueUnstableToBytes: IDL.Func(
      [CandyValue__1],
      [IDL.Vec(IDL.Nat8)],
      ['query']
    ),
    valueUnstableToBytesBuffer: IDL.Func(
      [CandyValue__1],
      [IDL.Vec(IDL.Nat8)],
      ['query']
    ),
    valueUnstableToFloat: IDL.Func([CandyValue__1], [IDL.Float64], ['query']),
    valueUnstableToFloatsBuffer: IDL.Func(
      [CandyValue__1],
      [IDL.Vec(IDL.Float64)],
      ['query']
    ),
    valueUnstableToInt: IDL.Func([CandyValue__1], [IDL.Int], ['query']),
    valueUnstableToInt16: IDL.Func([CandyValue__1], [IDL.Int16], ['query']),
    valueUnstableToInt32: IDL.Func([CandyValue__1], [IDL.Int32], ['query']),
    valueUnstableToInt64: IDL.Func([CandyValue__1], [IDL.Int64], ['query']),
    valueUnstableToInt8: IDL.Func([CandyValue__1], [IDL.Int8], ['query']),
    valueUnstableToNat: IDL.Func([CandyValue__1], [IDL.Nat], ['query']),
    valueUnstableToNat16: IDL.Func([CandyValue__1], [IDL.Nat16], ['query']),
    valueUnstableToNat32: IDL.Func([CandyValue__1], [IDL.Nat32], ['query']),
    valueUnstableToNat64: IDL.Func([CandyValue__1], [IDL.Nat64], ['query']),
    valueUnstableToNat8: IDL.Func([CandyValue__1], [IDL.Nat8], ['query']),
    valueUnstableToText: IDL.Func([CandyValue__1], [IDL.Text], ['query']),
    wallet_receive: IDL.Func([], [], []),
    wallet_withdraw: IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    workspaceDeepClone: IDL.Func(
      [AddressedChunkArray],
      [AddressedChunkArray],
      ['query']
    ),
    workspaceToAddressedChunkArray: IDL.Func(
      [AddressedChunkArray],
      [AddressedChunkArray],
      ['query']
    ),
  });
};
