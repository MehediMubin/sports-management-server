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

const getSalesHistoryAllTime = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryAllTime(
    req.query.branchName as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getSalesHistoryToday = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryToday(
    req.query.branchName as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getSalesHistoryThisWeek = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryThisWeek(
    req.query.branchName as string,
  );
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
  getSalesHistoryAllTime,
  getSalesHistoryToday,
  getSalesHistoryThisWeek,
  getHistoryMonthly,
  getHistoryYearly,
};
