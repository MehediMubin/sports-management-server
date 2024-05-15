import {Filter, PriceFilter, TProduct} from "./product.interface";
import {ProductModel} from "./product.model";

const createProduct = async (product: TProduct) => {
  const res = await ProductModel.create(product);
  return res;
};

const getAllProducts = async (filter: Filter) => {
  const caseInsensitiveFilter: PriceFilter = Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (key === "minPrice" || key === "maxPrice") {
        const priceFilter = key === "minPrice" ? "$gte" : "$lte";
        acc["price"] = {
          ...(acc["price"] || {}),
          [priceFilter]: Number(value),
        };
      } else if (typeof value === "string") {
        acc[key as keyof Filter] = {
          $regex: new RegExp(`^${value}$`, "i"),
        } as string & { $regex: RegExp };
      } else {
        acc[key as keyof Filter] = String(value);
      }
      return acc;
    },
    {} as PriceFilter,
  );

  const res = await ProductModel.find(caseInsensitiveFilter);
  return res;
};

const getProductById = async (id: string) => {
  const res = await ProductModel.findById(id);
  return res;
};

const getProductByName = async (name: string) => {
  const res = await ProductModel.find({
    name: new RegExp("^" + name + "$", "i"),
  });
  return res;
};

const updateProductById = async (id: string, payload: TProduct) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  const res = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return res;
};

const deleteProducts = async () => {
  return ProductModel.deleteMany({});
};

const deleteProductById = async (id: string) => {
  const res = await ProductModel.findByIdAndDelete(id);
  return res;
};

const deleteMultipleProducts = async (ids: string[]) => {
  const res = await ProductModel.deleteMany({ _id: { $in: ids } });
  return res;
};

export const ProductService = {
  createProduct,
  deleteProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
  getProductByName,
  deleteMultipleProducts,
};
