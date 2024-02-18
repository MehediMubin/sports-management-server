import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);
  const { password, ...user } = result.toJSON();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const UserController = {
  createUser,
};
