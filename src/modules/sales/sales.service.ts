import { startSession } from "mongoose";
import { ProductModel } from "../product/product.model";
import { TSale } from "./sales.interface";
import { SalesModel } from "./sales.model";

const sellProduct = async (payload: TSale) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const id = payload.productId;
    const product = await ProductModel.findById(id).session(session);
    if (!product) throw new Error("Product not found");

    const { quantity } = product;
    if (quantity < payload.quantity) throw new Error("Not enough quantity");

    const newQuantity = quantity - payload.quantity;

    if (newQuantity === 0) {
      await ProductModel.deleteOne({ _id: id }).session(session);
    } else {
      await ProductModel.updateOne(
        { _id: id },
        { quantity: newQuantity },
      ).session(session);
    }

    payload.totalPrice = payload.quantity * product.price;

    const result = await SalesModel.create([payload], { session });

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getSalesHistoryAllTime = async (branchName: string) => {
  const matchStage: { branch?: string } = {};

  if (branchName !== "all-branches") {
    matchStage["branch"] = branchName;
  }

  const result = await SalesModel.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
      },
    },
  ]);

  return result[0];
};

const getSalesHistoryToday = async (branchName: string) => {
  const matchStage: { date: { $gte: Date; $lte: Date }; branch?: string } = {
    date: {
      $gte: new Date(new Date().setHours(0, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 59)),
    },
  };

  if (branchName !== "all-branches") {
    matchStage.branch = branchName;
  }

  const result = await SalesModel.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
      },
    },
  ]);

  return result[0];
};

const getSalesHistoryThisWeek = async (branchName: string) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const matchStage: { date: { $gte: Date }; branch?: string } = {
    date: {
      $gte: oneWeekAgo,
    },
  };

  if (branchName !== "all-branches") {
    matchStage.branch = branchName;
  }

  const result = await SalesModel.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
      },
    },
  ]);

  return result[0];
};

const getSalesHistoryThisMonth = async (branchName: string) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const matchStage: { date: { $gte: Date }; branch?: string } = {
    date: {
      $gte: oneMonthAgo,
    },
  };

  if (branchName !== "all-branches") {
    matchStage.branch = branchName;
  }

  const result = await SalesModel.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
      },
    },
  ]);

  return result[0]; // Return the single aggregated result
};

const getSalesHistoryThisYear = async (branchName: string) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const matchStage: { date: { $gte: Date }; branch?: string } = {
    date: {
      $gte: oneYearAgo,
    },
  };

  if (branchName !== "all-branches") {
    matchStage.branch = branchName;
  }

  const result = await SalesModel.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
      },
    },
  ]);

  return result[0]; // Return the single aggregated result
};

export const SalesService = {
  sellProduct,
  getSalesHistoryAllTime,
  getSalesHistoryToday,
  getSalesHistoryThisWeek,
  getSalesHistoryThisMonth,
  getSalesHistoryThisYear,
};
