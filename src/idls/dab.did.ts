/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
export default ({ IDL }) => {
  const getAllResult = IDL.Vec(
    IDL.Record({
      name: IDL.Text,
      principal_id: IDL.Principal,
      standard: IDL.Text,
    })
  );
  return IDL.Service({
    get_all: IDL.Func([], [getAllResult], []),
  });
};
export const init = () => {
  return [];
};
