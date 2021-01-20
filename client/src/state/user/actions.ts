import { UserType } from "../../types/graphql";

export enum UserActionTypes {
  SET_USER = "SET_USER",
}

export type UserActions = SetUserType;

type SetUserType = {
  type: UserActionTypes.SET_USER;
  user: UserType;
};

export const setUser = (user: UserType): SetUserType => ({
  type: UserActionTypes.SET_USER,
  user,
});
