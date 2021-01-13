import AuthService from "../../services/AuthService";
import { MyContext } from "../../types/MyContext";

const hello = (_: any, __: any, context: MyContext) => {
  try {
    AuthService.isAuth(context);

    return "Hello, world!";
  } catch (error) {
    return error.message;
  }
};

export default { hello };
