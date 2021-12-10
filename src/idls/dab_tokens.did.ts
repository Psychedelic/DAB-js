export default ({ IDL }) => {
    const input_add_token = IDL.Record({
      'logo' : IDL.Text,
      'name' : IDL.Text,
      'description' : IDL.Text,
      'website' : IDL.Text,
      'principal_id' : IDL.Principal,
      'standard' : IDL.Text,
      'total_supply' : IDL.Opt(IDL.Nat64),
      'symbol' : IDL.Text,
    });
    const operation_error = IDL.Variant({
      'NotAuthorized' : IDL.Null,
      'BadParameters' : IDL.Null,
      'NonExistentToken' : IDL.Null,
      'ParamatersNotPassed' : IDL.Null,
    });
    const operation_response = IDL.Variant({
      'Ok' : IDL.Bool,
      'Err' : operation_error,
    });
    const input_edit_token = IDL.Record({
      'logo' : IDL.Opt(IDL.Text),
      'name' : IDL.Text,
      'description' : IDL.Opt(IDL.Text),
      'website' : IDL.Opt(IDL.Text),
      'principal_id' : IDL.Opt(IDL.Principal),
      'standard' : IDL.Opt(IDL.Text),
      'total_supply' : IDL.Opt(IDL.Nat64),
      'symbol' : IDL.Opt(IDL.Text),
    });
    const token = IDL.Record({
      'logo' : IDL.Text,
      'name' : IDL.Text,
      'description' : IDL.Text,
      'website' : IDL.Text,
      'timestamp' : IDL.Nat64,
      'principal_id' : IDL.Principal,
      'standard' : IDL.Text,
      'total_supply' : IDL.Opt(IDL.Nat64),
      'symbol' : IDL.Text,
    });
    return IDL.Service({
      'add' : IDL.Func([input_add_token], [operation_response], []),
      'edit' : IDL.Func([input_edit_token], [operation_response], []),
      'get_all' : IDL.Func([], [IDL.Vec(token)], ['query']),
      'name' : IDL.Func([], [IDL.Text], ['query']),
      'remove' : IDL.Func([IDL.Text], [operation_response], []),
      'set_controller' : IDL.Func([IDL.Principal], [operation_response], []),
    });
  };
  export const init = ({ IDL }) => { return []; };