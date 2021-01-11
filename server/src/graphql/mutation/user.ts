import { MutationRegisterArgs, UserResponse } from "../../types/generated";
import { User } from "../../entities/User";
import argon2 from "argon2";
import { validateOrReject } from "class-validator";

const register = async (
  _: any,
  { input: { fullname, password, email } }: MutationRegisterArgs
): Promise<UserResponse> => {
  try {
    const hashedPassword = await argon2.hash(password);
    const user = new User();
    user.fullname = fullname;
    user.password = hashedPassword;
    user.email = email;

    const errors = await validateOrReject(user);

    await user.save();
    return { user };
  } catch (error) {
    if (error.code === "23505") {
      return { errors: ["User email should be unique"] };
    }
    // if validation failed
    if (error.length > 0) {
      const errorMessages: Array<string> = [];
      error.map((err: any) => {
        const messages: Array<string> = Object.values(err.constraints);
        errorMessages.push(...messages);
      });
      return {
        errors: errorMessages,
      };
    }
    // unexpected error
    return { errors: ["Something goes wrong"] };
  }
};

export default { register };
