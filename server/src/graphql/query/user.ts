import AuthService from "../../services/AuthService";
import { MyContext } from "../../types/MyContext";

import { UserResponse } from "../../types/generated";
import UserService from "../../services/UserService";

const me = async (_: any, __: any, context: MyContext): Promise<UserResponse> => {
  try {
    await AuthService.isAuth(context);

    const user = await UserService.findUser(context.payload!.userId);
    return {
      user,
    };
  } catch (error) {
    return {
      errors: [error.message],
    };
  }
};

export default { me };
