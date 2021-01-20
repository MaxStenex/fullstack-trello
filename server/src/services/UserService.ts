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

  loginUser = async (email: string, password: string): Promise<User> => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new Error("Incorrect password");
    }

    return user;
  };

  findUser = async (id: string): Promise<User> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };
}

export default new UserService();
