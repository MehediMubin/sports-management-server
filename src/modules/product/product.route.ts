import { Router } from "express";
import auth from "../../middleware/auth";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/create-product",
  auth("superAdmin", "branchManager"),
  ProductController.createProduct,
);

router.get(
  "/",
  auth("superAdmin", "branchManager", "seller"),
  ProductController.getAllProducts,
);

router.get(
  "/:id",
  auth("superAdmin", "branchManager", "seller"),
  ProductController.getProductById,
);

router.get(
  "/product-by-name/:name",
  auth("superAdmin", "branchManager", "seller"),
  ProductController.getProductByName,
);

router.patch(
  "/update-product/:id",
  auth("superAdmin", "branchManager"),
  ProductController.updateProductById,
);

router.delete(
  "/delete-products",
  auth("superAdmin", "branchManager"),
  ProductController.deleteProducts,
);

router.delete(
  "/delete-product/:id",
  auth("superAdmin", "branchManager"),
  ProductController.deleteProductById,
);

router.delete(
  "/delete-multiple-products",
  auth("superAdmin", "branchManager"),
  ProductController.deleteMultipleProducts,
);

export const ProductRoute = router;
