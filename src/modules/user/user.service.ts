import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getBranch = async (username: string) => {
  const result = await UserModel.findOne({ username });
  let branch = null;
  if (result?.role === "branchManager") {
    branch = result?.branch;
  }
  return branch;
};

export const UserService = {
  createUser,
  getBranch,
};
