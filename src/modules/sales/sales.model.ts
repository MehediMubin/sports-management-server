import mongoose from "mongoose";
import { TSale } from "./sales.interface";

const SalesSchema = new mongoose.Schema<TSale>(
  {
    productId: { type: String, required: true },
    buyerName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const SalesModel = mongoose.model<TSale>("Sales", SalesSchema);
