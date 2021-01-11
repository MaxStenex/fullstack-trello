import { User } from "../entities/User";
import argon2 from "argon2";

class UserService {
  createUser = async (
    fullname: string,
    password: string,
    email: string
  ): Promise<User> => {
    const hashedPassword = await argon2.hash(password);

    const user = new User();
    user.fullname = fullname;
    user.password = hashedPassword;
    user.email = email;

    return user;
  };
}

export default new UserService();
