export default ({ IDL }) => {
  const MetadataVal = IDL.Variant({
    Nat64Content: IDL.Nat64,
    Nat32Content: IDL.Nat32,
    Nat8Content: IDL.Nat8,
    NatContent: IDL.Nat,
    Nat16Content: IDL.Nat16,
    BlobContent: IDL.Vec(IDL.Nat8),
    TextContent: IDL.Text,
  });
  const MetadataKeyVal = IDL.Record({ key: IDL.Text, val: MetadataVal });
  const MetadataPurpose = IDL.Variant({
    Preview: IDL.Null,
    Rendered: IDL.Null,
  });
  const MetadataPart = IDL.Record({
    data: IDL.Vec(IDL.Nat8),
    key_val_data: IDL.Vec(MetadataKeyVal),
    purpose: MetadataPurpose,
  });
  const MetadataDesc = IDL.Vec(MetadataPart);
  const ApiError = IDL.Variant({
    ZeroAddress: IDL.Null,
    InvalidTokenId: IDL.Null,
    Unauthorized: IDL.Null,
  });
  const MetadataResult = IDL.Variant({ Ok: MetadataDesc, Err: ApiError });
  const ExtendedMetadataResult = IDL.Record({
    token_id: IDL.Nat64,
    metadata_desc: MetadataDesc,
  });
  const TransactionType = IDL.Variant({
    Approve: IDL.Record({
      to: IDL.Principal,
      token_id: IDL.Nat64,
      from: IDL.Principal,
    }),
    Burn: IDL.Record({ token_id: IDL.Nat64 }),
    Mint: IDL.Record({ token_id: IDL.Nat64 }),
    SetApprovalForAll: IDL.Record({
      to: IDL.Principal,
      from: IDL.Principal,
    }),
    TransferFrom: IDL.Record({
      to: IDL.Principal,
      token_id: IDL.Nat64,
      from: IDL.Principal,
      caller: IDL.Opt(IDL.Principal),
    }),
  });
  const TransactionResult = IDL.Record({
    fee: IDL.Nat,
    transaction_type: TransactionType,
  });
  const LogoResult = IDL.Record({ data: IDL.Text, logo_type: IDL.Text });
  const MintReceiptPart = IDL.Record({
    id: IDL.Nat,
    token_id: IDL.Nat64,
  });
  const MintReceipt = IDL.Variant({ Ok: MintReceiptPart, Err: ApiError });
  const OwnerResult = IDL.Variant({ Ok: IDL.Principal, Err: ApiError });
  const TxReceipt = IDL.Variant({ Ok: IDL.Nat, Err: ApiError });
  const InterfaceId = IDL.Variant({
    Burn: IDL.Null,
    Mint: IDL.Null,
    Approval: IDL.Null,
    TransactionHistory: IDL.Null,
    TransferNotification: IDL.Null,
  });
  const erc721_token = IDL.Service({
    balanceOfDip721: IDL.Func([IDL.Principal], [IDL.Nat64], ['query']),
    getMaxLimitDip721: IDL.Func([], [IDL.Nat16], ['query']),
    getMetadataDip721: IDL.Func([IDL.Nat64], [MetadataResult], ['query']),
    getMetadataForUserDip721: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(ExtendedMetadataResult)],
      []
    ),
    getTransactionDip721: IDL.Func([IDL.Nat], [TransactionResult], ['query']),
    getTransactionsDip721: IDL.Func(
      [IDL.Nat, IDL.Nat16],
      [IDL.Vec(TransactionResult)],
      ['query']
    ),
    getUserTransactionsDip721: IDL.Func(
      [IDL.Nat, IDL.Nat16, IDL.Principal],
      [IDL.Vec(TransactionResult)],
      ['query']
    ),
    logoDip721: IDL.Func([], [LogoResult], ['query']),
    mintDip721: IDL.Func([IDL.Principal, MetadataDesc], [MintReceipt], []),
    nameDip721: IDL.Func([], [IDL.Text], ['query']),
    ownerOfDip721: IDL.Func([IDL.Nat64], [OwnerResult], ['query']),
    safeTransferFromDip721: IDL.Func(
      [IDL.Principal, IDL.Principal, IDL.Nat64],
      [TxReceipt],
      []
    ),
    supportedInterfacesDip721: IDL.Func([], [IDL.Vec(InterfaceId)], ['query']),
    symbolDip721: IDL.Func([], [IDL.Text], ['query']),
    totalSupplyDip721: IDL.Func([], [IDL.Nat64], ['query']),
    transferFromDip721: IDL.Func(
      [IDL.Principal, IDL.Principal, IDL.Nat64],
      [TxReceipt],
      []
    ),
  });
  return erc721_token;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Text, IDL.Text, IDL.Principal];
};
