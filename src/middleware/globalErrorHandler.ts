import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = 500;
  let message = "Something went wrong";

  let errorSources: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error?.stack : null,
  });
  next();
};

export default globalErrorHandler;
