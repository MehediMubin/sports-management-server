import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthService.loginUser(username, password);

  const { refreshToken, ...rest } = user;

  // set refresh token in the cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: rest,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const user = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: user,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
