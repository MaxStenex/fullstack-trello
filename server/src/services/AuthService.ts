import { Response, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "../entities/User";
import { MyContext } from "../types/MyContext";

class AuthService {
  createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  };

  sendAccessToken = (res: Response, token: string) => {
    res.cookie("at", token, {
      httpOnly: true,
    });
  };

  isAuth = (context: MyContext): void => {
    const authorizationHeaders = context.req.headers["authorization"];
    if (!authorizationHeaders) {
      throw new Error("User not authenticated");
    }
    try {
      const token = authorizationHeaders.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

      if (!payload.userId) {
        throw new Error("User not authenticated");
      }
      context.payload = payload;
    } catch (error) {
      throw new Error("User not authenticated");
    }
  };
}

export default new AuthService();
