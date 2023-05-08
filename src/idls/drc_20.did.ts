export default ({ IDL }) => {
  const Metadata = IDL.Record({ content: IDL.Text, name: IDL.Text });
  const Address = IDL.Text;
  const InitArgs = IDL.Record({
    fee: IDL.Nat,
    decimals: IDL.Nat8,
    metadata: IDL.Opt(IDL.Vec(Metadata)),
    name: IDL.Opt(IDL.Text),
    totalSupply: IDL.Nat,
    founder: IDL.Opt(Address),
    symbol: IDL.Opt(IDL.Text),
  });
  const Spender = IDL.Text;
  const Amount = IDL.Nat;
  const AccountId = IDL.Vec(IDL.Nat8);
  const Allowance = IDL.Record({
    remaining: IDL.Nat,
    spender: AccountId,
  });
  const Nonce = IDL.Nat;
  const Sa = IDL.Vec(IDL.Nat8);
  const Data = IDL.Vec(IDL.Nat8);
  const Txid = IDL.Vec(IDL.Nat8);
  const TxnResult = IDL.Variant({
    ok: Txid,
    err: IDL.Record({
      code: IDL.Variant({
        NonceError: IDL.Null,
        InsufficientGas: IDL.Null,
        InsufficientAllowance: IDL.Null,
        UndefinedError: IDL.Null,
        InsufficientBalance: IDL.Null,
        NoLockedTransfer: IDL.Null,
        DuplicateExecutedTransfer: IDL.Null,
        LockedTransferExpired: IDL.Null,
      }),
      message: IDL.Text,
    }),
  });
  const ExecuteType = IDL.Variant({
    fallback: IDL.Null,
    send: IDL.Nat,
    sendAll: IDL.Null,
  });
  const To = IDL.Text;
  const CoinSeconds = IDL.Record({
    updateTime: IDL.Int,
    coinSeconds: IDL.Nat,
  });
  const Timeout = IDL.Nat32;
  const Decider = IDL.Text;
  const From = IDL.Text;
  const Gas = IDL.Variant({
    token: IDL.Nat,
    cycles: IDL.Nat,
    noFee: IDL.Null,
  });
  const Time = IDL.Int;
  const Operation = IDL.Variant({
    approve: IDL.Record({ allowance: IDL.Nat }),
    lockTransfer: IDL.Record({
      locked: IDL.Nat,
      expiration: Time,
      decider: AccountId,
    }),
    transfer: IDL.Record({
      action: IDL.Variant({
        burn: IDL.Null,
        mint: IDL.Null,
        send: IDL.Null,
      }),
    }),
    executeTransfer: IDL.Record({
      fallback: IDL.Nat,
      lockedTxid: Txid,
    }),
  });
  const Transaction = IDL.Record({
    to: AccountId,
    value: IDL.Nat,
    data: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: AccountId,
    operation: Operation,
  });
  const TxnRecord = IDL.Record({
    gas: Gas,
    msgCaller: IDL.Opt(IDL.Principal),
    transaction: Transaction,
    txid: Txid,
    nonce: IDL.Nat,
    timestamp: Time,
    caller: AccountId,
    index: IDL.Nat,
  });
  const Callback = IDL.Func([TxnRecord], [], []);
  const MsgType = IDL.Variant({
    onApprove: IDL.Null,
    onExecute: IDL.Null,
    onTransfer: IDL.Null,
    onLock: IDL.Null,
  });
  const Subscription = IDL.Record({
    callback: Callback,
    msgTypes: IDL.Vec(MsgType),
  });
  const TxnQueryRequest = IDL.Variant({
    getEvents: IDL.Record({ owner: IDL.Opt(Address) }),
    txnCount: IDL.Record({ owner: Address }),
    lockedTxns: IDL.Record({ owner: Address }),
    lastTxids: IDL.Record({ owner: Address }),
    lastTxidsGlobal: IDL.Null,
    getTxn: IDL.Record({ txid: Txid }),
    txnCountGlobal: IDL.Null,
  });
  const TxnQueryResponse = IDL.Variant({
    getEvents: IDL.Vec(TxnRecord),
    txnCount: IDL.Nat,
    lockedTxns: IDL.Record({
      txns: IDL.Vec(TxnRecord),
      lockedBalance: IDL.Nat,
    }),
    lastTxids: IDL.Vec(Txid),
    lastTxidsGlobal: IDL.Vec(Txid),
    getTxn: IDL.Opt(TxnRecord),
    txnCountGlobal: IDL.Nat,
  });
  const DRC20 = IDL.Service({
    drc20_allowance: IDL.Func([Address, Spender], [Amount], ['query']),
    drc20_approvals: IDL.Func([Address], [IDL.Vec(Allowance)], ['query']),
    drc20_approve: IDL.Func(
      [Spender, Amount, IDL.Opt(Nonce), IDL.Opt(Sa), IDL.Opt(Data)],
      [TxnResult],
      []
    ),
    drc20_balanceOf: IDL.Func([Address], [Amount], ['query']),
    drc20_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    drc20_dropAccount: IDL.Func([IDL.Opt(Sa)], [IDL.Bool], []),
    drc20_executeTransfer: IDL.Func(
      [
        Txid,
        ExecuteType,
        IDL.Opt(To),
        IDL.Opt(Nonce),
        IDL.Opt(Sa),
        IDL.Opt(Data),
      ],
      [TxnResult],
      []
    ),
    drc20_fee: IDL.Func([], [Amount], ['query']),
    drc20_getCoinSeconds: IDL.Func(
      [IDL.Opt(Address)],
      [CoinSeconds, IDL.Opt(CoinSeconds)],
      ['query']
    ),
    drc20_holdersCount: IDL.Func([], [IDL.Nat, IDL.Nat, IDL.Nat], ['query']),
    drc20_lockTransfer: IDL.Func(
      [
        To,
        Amount,
        Timeout,
        IDL.Opt(Decider),
        IDL.Opt(Nonce),
        IDL.Opt(Sa),
        IDL.Opt(Data),
      ],
      [TxnResult],
      []
    ),
    drc20_lockTransferFrom: IDL.Func(
      [
        From,
        To,
        Amount,
        Timeout,
        IDL.Opt(Decider),
        IDL.Opt(Nonce),
        IDL.Opt(Sa),
        IDL.Opt(Data),
      ],
      [TxnResult],
      []
    ),
    drc20_metadata: IDL.Func([], [IDL.Vec(Metadata)], ['query']),
    drc20_name: IDL.Func([], [IDL.Text], ['query']),
    drc20_subscribe: IDL.Func(
      [Callback, IDL.Vec(MsgType), IDL.Opt(Sa)],
      [IDL.Bool],
      []
    ),
    drc20_subscribed: IDL.Func([Address], [IDL.Opt(Subscription)], ['query']),
    drc20_symbol: IDL.Func([], [IDL.Text], ['query']),
    drc20_totalSupply: IDL.Func([], [Amount], ['query']),
    drc20_transfer: IDL.Func(
      [To, Amount, IDL.Opt(Nonce), IDL.Opt(Sa), IDL.Opt(Data)],
      [TxnResult],
      []
    ),
    drc20_transferBatch: IDL.Func(
      [
        IDL.Vec(To),
        IDL.Vec(Amount),
        IDL.Opt(Nonce),
        IDL.Opt(Sa),
        IDL.Opt(Data),
      ],
      [IDL.Vec(TxnResult)],
      []
    ),
    drc20_transferFrom: IDL.Func(
      [From, To, Amount, IDL.Opt(Nonce), IDL.Opt(Sa), IDL.Opt(Data)],
      [TxnResult],
      []
    ),
    drc20_txnQuery: IDL.Func([TxnQueryRequest], [TxnQueryResponse], ['query']),
    drc20_txnRecord: IDL.Func([Txid], [IDL.Opt(TxnRecord)], []),
    standard: IDL.Func([], [IDL.Text], ['query']),
  });
  return DRC20;
};
export const init = ({ IDL }) => {
  const Metadata = IDL.Record({ content: IDL.Text, name: IDL.Text });
  const Address = IDL.Text;
  const InitArgs = IDL.Record({
    fee: IDL.Nat,
    decimals: IDL.Nat8,
    metadata: IDL.Opt(IDL.Vec(Metadata)),
    name: IDL.Opt(IDL.Text),
    totalSupply: IDL.Nat,
    founder: IDL.Opt(Address),
    symbol: IDL.Opt(IDL.Text),
  });
  return [InitArgs];
};
