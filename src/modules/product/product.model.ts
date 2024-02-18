import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["new", "used"],
    required: true,
  },
});

export const ProductModel = model<TProduct>("Product", productSchema);
