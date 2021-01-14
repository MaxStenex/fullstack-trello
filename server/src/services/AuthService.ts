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

  createRefreshToken = (user: User) => {
    return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  };

  sendRefreshToken = (res: Response, token: string) => {
    res.cookie("rt", token, {
      httpOnly: true,
    });
  };

  refreshTokens = async (req: Request, res: Response) => {
    const invalidTokenResponse = () => res.status(401).send("Invalid token");

    const refreshToken = req.cookies.rt;
    if (!refreshToken) {
      return invalidTokenResponse();
    }

    let payload = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
    } catch {
      return invalidTokenResponse();
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.status(403).send("User not found");
    }

    const newRefreshToken = this.createRefreshToken(user);
    const newAccessToken = this.createAccessToken(user);

    this.sendAccessToken(res, newAccessToken);
    this.sendRefreshToken(res, newRefreshToken);
    res.sendStatus(200);
  };

  isAuth = (context: MyContext): void => {
    const accessToken = context.req.cookies.at;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }
    try {
      const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
      if (!payload.userId) {
        throw new Error("User not authenticated");
      }
      context.payload = payload;
    } catch (error) {
      this.refreshTokens(context.req, context.res);
    }
  };
}

export default new AuthService();
