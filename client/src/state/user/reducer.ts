import { UserType } from "../../types/graphql";

export type AuthStateType = {
  user: null | UserType;
};

export const authReducer = (state: AuthStateType, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
