import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesService } from "./sales.service";

const sellProduct = catchAsync(async (req, res) => {
  const result = await SalesService.sellProduct(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product sold successfully",
    data: result,
  });
});

const getHistory = catchAsync(async (req, res) => {
  const result = await SalesService.getHistory();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getSalesHistoryToday = catchAsync(async (req, res) => {
  let branchName = req.query.branchName as string;
  if (branchName === "All Branches") branchName = "all-branches";
  const result = await SalesService.getHistoryDaily(branchName);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getHistoryWeekly = catchAsync(async (req, res) => {
  const result = await SalesService.getHistoryWeekly();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getHistoryMonthly = catchAsync(async (req, res) => {
  const result = await SalesService.getHistoryMonthly();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getHistoryYearly = catchAsync(async (req, res) => {
  const result = await SalesService.getHistoryYearly();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

export const SalesController = {
  sellProduct,
  getHistory,
  getSalesHistoryToday,
  getHistoryWeekly,
  getHistoryMonthly,
  getHistoryYearly,
};
