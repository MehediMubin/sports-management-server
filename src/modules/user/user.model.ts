import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "branchManager", "seller"],
      required: true,
    },
    branch: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// check if the user already exists
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const result = await UserModel.findOne({ username: user.username });
  if (result) {
    throw new Error("User already exists");
  }
  next();
});

export const UserModel = model<TUser>("User", userSchema);
