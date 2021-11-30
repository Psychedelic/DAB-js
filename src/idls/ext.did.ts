/* eslint-disable @typescript-eslint/naming-convention */
export default ({ IDL }) => {
  const File = IDL.Record({
    data: IDL.Vec(IDL.Vec(IDL.Nat8)),
    ctype: IDL.Text,
  });
  const Asset = IDL.Record({
    thumbnail: IDL.Opt(File),
    name: IDL.Text,
    payload: File,
  });
  const SubAccount__1 = IDL.Vec(IDL.Nat8);
  const TokenIndex = IDL.Nat32;
  const AccountIdentifier = IDL.Text;
  const Settlement = IDL.Record({
    subaccount: SubAccount__1,
    seller: IDL.Principal,
    buyer: AccountIdentifier,
    price: IDL.Nat64,
  });
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier__1 = IDL.Text;
  const User = IDL.Variant({
    principal: IDL.Principal,
    address: AccountIdentifier__1,
  });
  const BalanceRequest = IDL.Record({
    token: TokenIdentifier,
    user: User,
  });
  const Balance = IDL.Nat;
  const CommonError__1 = IDL.Variant({
    InvalidToken: TokenIdentifier,
    Other: IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    ok: Balance,
    err: CommonError__1,
  });
  const TokenIdentifier__1 = IDL.Text;
  const CommonError = IDL.Variant({
    InvalidToken: TokenIdentifier,
    Other: IDL.Text,
  });
  const Result_5 = IDL.Variant({
    ok: AccountIdentifier,
    err: CommonError,
  });
  const Time = IDL.Int;
  const Listing = IDL.Record({
    locked: IDL.Opt(Time),
    seller: IDL.Principal,
    price: IDL.Nat64,
  });
  const Result_6 = IDL.Variant({
    ok: IDL.Tuple(AccountIdentifier, IDL.Opt(Listing)),
    err: CommonError,
  });
  const Extension = IDL.Text;
  const Metadata = IDL.Variant({
    fungible: IDL.Record({
      decimals: IDL.Nat8,
      metadata: IDL.Opt(IDL.Vec(IDL.Nat8)),
      name: IDL.Text,
      symbol: IDL.Text,
    }),
    nonfungible: IDL.Record({ metadata: IDL.Opt(IDL.Vec(IDL.Nat8)) }),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
  });
  const HttpStreamingCallbackToken = IDL.Record({
    key: IDL.Text,
    sha256: IDL.Opt(IDL.Vec(IDL.Nat8)),
    index: IDL.Nat,
    content_encoding: IDL.Text,
  });
  const HttpStreamingCallbackResponse = IDL.Record({
    token: IDL.Opt(HttpStreamingCallbackToken),
    body: IDL.Vec(IDL.Nat8),
  });
  const HttpStreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: HttpStreamingCallbackToken,
      callback: IDL.Func(
        [HttpStreamingCallbackToken],
        [HttpStreamingCallbackResponse],
        ["query"]
      ),
    }),
  });
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(HttpStreamingStrategy),
    status_code: IDL.Nat16,
  });
  const ListRequest = IDL.Record({
    token: TokenIdentifier__1,
    from_subaccount: IDL.Opt(SubAccount__1),
    price: IDL.Opt(IDL.Nat64),
  });
  const Result_3 = IDL.Variant({ ok: IDL.Null, err: CommonError });
  const Result_4 = IDL.Variant({ ok: Metadata, err: CommonError });
  const MintingRequest = IDL.Record({
    to: AccountIdentifier,
    asset: IDL.Nat32,
  });
  const Balance__1 = IDL.Nat;
  const Result_2 = IDL.Variant({ ok: Balance__1, err: CommonError });
  const Result_1 = IDL.Variant({
    ok: IDL.Vec(TokenIndex),
    err: CommonError,
  });
  const Result = IDL.Variant({
    ok: IDL.Vec(
      IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))
    ),
    err: CommonError,
  });
  const Transaction = IDL.Record({
    token: TokenIdentifier__1,
    time: Time,
    seller: IDL.Principal,
    buyer: AccountIdentifier,
    price: IDL.Nat64,
  });
  const Memo = IDL.Vec(IDL.Nat8);
  const SubAccount = IDL.Vec(IDL.Nat8);
  const TransferRequest = IDL.Record({
    to: User,
    token: TokenIdentifier,
    notify: IDL.Bool,
    from: User,
    memo: Memo,
    subaccount: IDL.Opt(SubAccount),
    amount: Balance,
  });
  const TransferResponse = IDL.Variant({
    ok: Balance,
    err: IDL.Variant({
      CannotNotify: AccountIdentifier__1,
      InsufficientBalance: IDL.Null,
      InvalidToken: TokenIdentifier,
      Rejected: IDL.Null,
      Unauthorized: AccountIdentifier__1,
      Other: IDL.Text,
    }),
  });
  return IDL.Service({
    acceptCycles: IDL.Func([], [], []),
    addAsset: IDL.Func([Asset], [IDL.Nat], []),
    allPayments: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(SubAccount__1)))],
      ["query"]
    ),
    allSettlements: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, Settlement))],
      ["query"]
    ),
    availableCycles: IDL.Func([], [IDL.Nat], ["query"]),
    balance: IDL.Func([BalanceRequest], [BalanceResponse], ["query"]),
    bearer: IDL.Func([TokenIdentifier__1], [Result_5], ["query"]),
    clearPayments: IDL.Func([IDL.Principal, IDL.Vec(SubAccount__1)], [], []),
    details: IDL.Func([TokenIdentifier__1], [Result_6], ["query"]),
    extensions: IDL.Func([], [IDL.Vec(Extension)], ["query"]),
    getMinter: IDL.Func([], [IDL.Principal], ["query"]),
    getRegistry: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier))],
      ["query"]
    ),
    getTokens: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))],
      ["query"]
    ),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    http_request_streaming_callback: IDL.Func(
      [HttpStreamingCallbackToken],
      [HttpStreamingCallbackResponse],
      ["query"]
    ),
    list: IDL.Func([ListRequest], [Result_3], []),
    list_bulk: IDL.Func(
      [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Nat64))],
      [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Nat64))],
      []
    ),
    listings: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))],
      ["query"]
    ),
    lock: IDL.Func(
      [TokenIdentifier__1, IDL.Nat64, AccountIdentifier, SubAccount__1],
      [Result_5],
      []
    ),
    metadata: IDL.Func([TokenIdentifier__1], [Result_4], ["query"]),
    mintNFT: IDL.Func([MintingRequest], [TokenIndex], []),
    payments: IDL.Func([], [IDL.Opt(IDL.Vec(SubAccount__1))], ["query"]),
    removePayments: IDL.Func([IDL.Vec(SubAccount__1)], [], []),
    setMinter: IDL.Func([IDL.Principal], [], []),
    settle: IDL.Func([TokenIdentifier__1], [Result_3], []),
    settlements: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier, IDL.Nat64))],
      ["query"]
    ),
    stats: IDL.Func(
      [],
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
      ["query"]
    ),
    streamAsset: IDL.Func([IDL.Nat, IDL.Bool, IDL.Vec(IDL.Nat8)], [], []),
    supply: IDL.Func([TokenIdentifier__1], [Result_2], ["query"]),
    tokens: IDL.Func([AccountIdentifier], [Result_1], ["query"]),
    tokens_ext: IDL.Func([AccountIdentifier], [Result], ["query"]),
    transactions: IDL.Func([], [IDL.Vec(Transaction)], ["query"]),
    transfer: IDL.Func([TransferRequest], [TransferResponse], []),
    transfer_bulk: IDL.Func(
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier))],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier))],
      []
    ),
    updateThumb: IDL.Func([IDL.Text, File], [IDL.Opt(IDL.Nat)], []),
  });
};
