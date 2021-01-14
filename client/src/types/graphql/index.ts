type UserType = {
  id: number;
  fullname: string;
  email: string;
  createdAt: string;
};

export type RegisterMutationVarsType = {
  fullname: string;
  email: string;
  password: string;
};

export type RegisterMutationResponseType = {
  register: {
    user: UserType | null;
    errors: [string] | null;
  };
};
