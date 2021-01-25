import { UserType } from "../../types/graphql";

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_LOADING = "SET_LOADING",
  SET_LOADED = "SET_LOADED",
  USER_LOGOUT = "USER_LOGOUT",
}

export type UserActions = SetUserType | SetLoadingType | SetLoadedType | LogoutUserType;

type SetUserType = {
  type: UserActionTypes.SET_USER;
  user: UserType;
};

export const setUser = (user: UserType): SetUserType => ({
  type: UserActionTypes.SET_USER,
  user,
});

type SetLoadingType = {
  type: UserActionTypes.SET_LOADING;
};

export const setLoading = (): SetLoadingType => ({
  type: UserActionTypes.SET_LOADING,
});

type SetLoadedType = {
  type: UserActionTypes.SET_LOADED;
};

export const setLoaded = (): SetLoadedType => ({
  type: UserActionTypes.SET_LOADED,
});

type LogoutUserType = {
  type: UserActionTypes.USER_LOGOUT;
};

export const logoutUser = (): LogoutUserType => ({
  type: UserActionTypes.USER_LOGOUT,
});
