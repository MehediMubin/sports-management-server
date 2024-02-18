export type TUser = {
  username: string;
  password: string;
  role: "superAdmin" | "branchManager" | "seller";
};

export const USER_ROLE = {
  superAdmin: "superAdmin",
  branchManager: "branchManager",
  seller: "seller",
};

export type TUserRole = keyof typeof USER_ROLE;
