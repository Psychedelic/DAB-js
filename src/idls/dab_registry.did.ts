export default ({ IDL }) => {
  const input_canister_metadata = IDL.Record({
    url: IDL.Text,
    name: IDL.Text,
    description: IDL.Text,
    logo_url: IDL.Text,
  });
  const canister_metadata = IDL.Record({
    url: IDL.Text,
    name: IDL.Text,
    description: IDL.Text,
    version: IDL.Nat32,
    logo_url: IDL.Text,
  });
  return IDL.Service({
    add_canister: IDL.Func(
      [IDL.Principal, input_canister_metadata],
      [IDL.Opt(IDL.Text)],
      []
    ),
    get_all: IDL.Func([], [IDL.Vec(canister_metadata)], ['query']),
    get_info: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(IDL.Opt(canister_metadata))],
      ['query']
    ),
    name: IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({}) => {
  return [];
};
