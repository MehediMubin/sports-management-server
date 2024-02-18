import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: { id: Types.ObjectId; username: string },
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const payload = jwt.verify(token, secret);
  return payload;
};
