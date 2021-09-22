export default ({ IDL }) => {
  const CanisterMetadata = IDL.Record({
    idl: IDL.Opt(IDL.Text),
    url: IDL.Opt(IDL.Text),
    description: IDL.Opt(IDL.Text),
    version: IDL.Nat32,
    logo_url: IDL.Opt(IDL.Text),
    principal_id: IDL.Principal,
    name: IDL.Text,
  });
  return IDL.Service({
    add_canister: IDL.Func([IDL.Text, CanisterMetadata], [], []),
    get_info: IDL.Func([IDL.Text], [IDL.Opt(CanisterMetadata)], []),
    name: IDL.Func([], [IDL.Text], ['query']),
    set_description: IDL.Func([IDL.Text, IDL.Text], [], []),
    set_idl: IDL.Func([IDL.Text, IDL.Text], [], []),
    set_logo: IDL.Func([IDL.Text, IDL.Text], [], []),
    set_url: IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = () => {
  return [];
};
