import {
  MutationRegisterArgs,
  UserResponse,
  MutationLoginArgs,
} from "../../types/generated";
import { validateOrReject } from "class-validator";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

import { MyContext } from "../../types/MyContext";

const register = async (
  _: any,
  { input: { fullname, password, email } }: MutationRegisterArgs
): Promise<UserResponse> => {
  try {
    if (password.length < 5) {
      throw new Error("Password length should be greater then 5");
    }
    if (password.length > 255) {
      throw new Error("Password length should be smaller then 255");
    }

    const user = await UserService.createUser(fullname, password, email);
    await validateOrReject(user);

    await user.save();
    return { user };
  } catch (errors) {
    if (errors.code === "23505") {
      return { errors: ["User email should be unique"] };
    }

    // if validation failed
    if (errors.length > 0) {
      const errorMessages: Array<string> = [];
      errors.map((err: any) => {
        const messages: Array<string> = Object.values(err.constraints);
        errorMessages.push(...messages);
      });
      return {
        errors: errorMessages,
      };
    }
    // unexpected error
    return { errors: [errors.message] };
  }
};

const login = async (
  _: any,
  { email, password }: MutationLoginArgs,
  { res }: MyContext
): Promise<UserResponse> => {
  try {
    const user = await UserService.loginUser(email, password);

    const accessToken = AuthService.createAccessToken(user);
    const refreshToken = AuthService.createRefreshToken(user);

    AuthService.sendAccessToken(res, accessToken);
    AuthService.sendRefreshToken(res, refreshToken);
    return { user };
  } catch (error) {
    return { errors: [error.message] };
  }
};

export default { register, login };
