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

const getSalesHistoryThisMonth = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryThisMonth(
    req.query.branchName as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Total quantity sold",
    data: result,
  });
});

const getSalesHistoryThisYear = catchAsync(async (req, res) => {
  const result = await SalesService.getSalesHistoryThisYear(req.query.branchName as string);
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
  getSalesHistoryThisMonth,
  getSalesHistoryThisYear,
};
