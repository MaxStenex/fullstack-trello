import { MutationRegisterArgs, UserResponse } from "../../types/generated";
import { validateOrReject } from "class-validator";
import UserService from "../../services/UserService";

const register = async (
  _: any,
  { input: { fullname, password, email } }: MutationRegisterArgs
): Promise<UserResponse> => {
  try {
    const user = await UserService.createUser(fullname, password, email);

    await validateOrReject(Object.assign(user, { password }));

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
