import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
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

    const { id, role } = decoded;

    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("You are not authorized!");
    }

    next();
  });
};

export default auth;
