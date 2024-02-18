import config from "../config";
import { USER_ROLE } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";

const superAdminInfo = {
  id: "0001",
  username: "mehedi",
  password: config.super_admin_password,
  role: "superAdmin",
};

const seedSuperAdmin = async () => {
  const user = await UserModel.findOne({ role: USER_ROLE.superAdmin });
  if (!user) {
    await UserModel.create(superAdminInfo);
  }
};

export default seedSuperAdmin;
