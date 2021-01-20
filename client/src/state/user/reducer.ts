import { UserType } from "../../types/graphql";
import { UserActions, UserActionTypes } from "./actions";

export type AuthStateType = {
  user: null | UserType;
};

export const authReducer = (state: AuthStateType, action: UserActions) => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return { user: action.user };
    }

    default: {
      return state;
    }
  }
};
