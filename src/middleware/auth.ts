import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    // get token from the header
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Unauthorized");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new Error("Token is invalid");
    }

    const { id } = decoded;

    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    next();
  });
};

export default auth;
