import { UserType } from "../../types/graphql";
import { UserActions, UserActionTypes } from "./actions";

export type AuthStateType = {
  user: null | UserType;
  loading: boolean;
};

export const authReducer = (state: AuthStateType, action: UserActions): AuthStateType => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return { user: action.user, loading: false };
    }
    case UserActionTypes.SET_LOADING: {
      return { ...state, loading: true };
    }
    case UserActionTypes.SET_LOADED: {
      return { ...state, loading: false };
    }
    case UserActionTypes.USER_LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};
