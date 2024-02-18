import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { UserModel } from "../user/user.model";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  if (password !== user.password) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user._id,
    username: user.username,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { user, accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { id } = decoded;
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const jwtPayload = {
    id: user._id,
    username: user.username,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
