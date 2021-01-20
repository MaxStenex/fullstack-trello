import { Response, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { getConnection } from "typeorm";
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
    return sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );
  };

  sendRefreshToken = (res: Response, token: string) => {
    res.cookie("rt", token, {
      httpOnly: true,
    });
  };

  refreshTokens = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.rt;

    if (!refreshToken) {
      throw new Error("Invalid refresh token");
    }

    let payload = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
    } catch {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new Error("Invalid token version");
    }

    const newRefreshToken = this.createRefreshToken(user);
    const newAccessToken = this.createAccessToken(user);

    this.sendAccessToken(res, newAccessToken);
    this.sendRefreshToken(res, newRefreshToken);
  };

  isAuth = async (context: MyContext): Promise<void> => {
    const accessToken = context.req.cookies.at;
    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    await this.refreshTokens(context.req, context.res);

    try {
      const payload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
      if (!payload.userId) {
        throw new Error("User not authenticated");
      }
      context.payload = payload;
    } catch (error) {
      throw new Error("User not authenticated");
    }
  };

  revokeRefreshTokens = async (userId: number): Promise<void> => {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
  };
}

export default new AuthService();
