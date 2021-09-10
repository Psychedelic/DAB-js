/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
export default ({ IDL }) => {
  const getAllResult = IDL.VEC(
    IDL.Record({
      name: IDL.Text,
      principal_id: IDL.Principal,
      standard: IDL.Text,
    })
  );
  return IDL.Service({
    get_all: IDL.Func([], [getAllResult], ['query']),
  });
};
export const init = () => {
  return [];
};
