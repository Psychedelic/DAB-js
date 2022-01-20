export const idlFactory = ({ IDL }) => {
  const input_nft_canister = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'principal_id' : IDL.Principal,
    'standard' : IDL.Text,
  });
  const operation_error = IDL.Variant({
    'NotAuthorized' : IDL.Null,
    'BadParameters' : IDL.Null,
    'NonExistentItem' : IDL.Null,
    'ParamatersNotPassed' : IDL.Null,
  });
  const operation_response = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : operation_error,
  });
  const nft_canister = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'principal_id' : IDL.Principal,
    'standard' : IDL.Text,
  });
  return IDL.Service({
    'add' : IDL.Func([input_nft_canister], [operation_response], []),
    'edit' : IDL.Func(
        [
          IDL.Principal,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [operation_response],
        [],
      ),
    'get' : IDL.Func([IDL.Principal], [IDL.Opt(nft_canister)], ['query']),
    'get_all' : IDL.Func([], [IDL.Vec(nft_canister)], ['query']),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'remove' : IDL.Func([IDL.Principal], [operation_response], []),
    'set_controller' : IDL.Func([IDL.Principal], [operation_response], []),
  });
};
export const init = ({ IDL }) => { return []; };
