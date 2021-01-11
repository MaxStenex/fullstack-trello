import { User, MutationCreateUserArgs } from "../../types/generated";

const createUser = (
  _: any,
  { input: { fullname, password, email } }: MutationCreateUserArgs
): User => {
  return {
    id: 123,
    fullname,
    email,
    createdAt: Date.now().toString(),
  };
};

export default { createUser };
