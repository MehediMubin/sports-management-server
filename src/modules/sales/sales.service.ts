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

const getHistory = async () => {
  const result = await SalesModel.aggregate([
    {
      $group: {
        _id: { $toObjectId: "$productId" },
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
        name: "$product.name",
      },
    },
  ]);
  return result[0];
};

const getHistoryDaily = async () => {
  const result = await SalesModel.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59)),
        },
      },
    },
    {
      $group: {
        _id: { $toObjectId: "$productId" },
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
        name: "$product.name",
      },
    },
  ]);
  return result[0];
};

const getHistoryWeekly = async () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const result = await SalesModel.aggregate([
    {
      $match: {
        date: {
          $gte: oneWeekAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          week: { $week: "$date" },
          productId: { $toObjectId: "$productId" },
        },
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
        name: "$product.name",
      },
    },
  ]);
  return result[0];
};

const getHistoryMonthly = async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const result = await SalesModel.aggregate([
    {
      $match: {
        date: {
          $gte: oneMonthAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          productId: { $toObjectId: "$productId" },
        },
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
        name: "$product.name",
      },
    },
  ]);
  return result[0];
};

const getHistoryYearly = async () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const result = await SalesModel.aggregate([
    {
      $match: {
        date: {
          $gte: oneYearAgo,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          productId: { $toObjectId: "$productId" },
        },
        totalQuantity: { $sum: "$quantity" },
        totalSellAmount: { $sum: "$totalPrice" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        totalSellAmount: 1,
        name: "$product.name",
      },
    },
  ]);
  return result[0];
};

const getBranchHistory = async (branch: string) => {
  if (branch === "All Branches") {
    branch = "all-branches";
    const result = await SalesModel.find().select("totalPrice");
    return result.reduce((acc, cur) => acc + cur.totalPrice, 0);
  } else {
    const result = await SalesModel.find({ branch: branch }).select(
      "totalPrice",
    );
    return result.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }
};

export const SalesService = {
  sellProduct,
  getHistory,
  getHistoryDaily,
  getHistoryWeekly,
  getHistoryMonthly,
  getHistoryYearly,
  getBranchHistory,
};
