import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const getProductByName = catchAsync(async (req, res) => {
  console.log(req.params.name);
  const result = await ProductService.getProductByName(req.params.name);
  // console.log(result);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProductById = catchAsync(async (req, res) => {
  const result = await ProductService.updateProductById(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProducts = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProducts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products deleted successfully",
    data: result,
  });
});

const deleteProductById = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProductById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const deleteMultipleProducts = catchAsync(async (req, res) => {
  const result = await ProductService.deleteMultipleProducts(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  deleteProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
  getProductByName,
  deleteMultipleProducts,
};
