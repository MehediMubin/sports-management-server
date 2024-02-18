import { Response } from "express";

type TData = {
  statusCode: number;
  success: boolean;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const sendResponse = (res: Response, data: TData) => {
  const { statusCode, success, message, data: result } = data;

  res.status(statusCode).json({
    success,
    message,
    data: result,
  });
};

export default sendResponse;
