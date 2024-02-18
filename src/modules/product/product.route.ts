import { Router } from "express";
import auth from "../../middleware/auth";
import { ProductController } from "./product.controller";

const router = Router();

router.post("/create-product", auth(), ProductController.createProduct);

router.get("/", auth(), ProductController.getAllProducts);

router.get("/:id", auth(), ProductController.getProductById);

router.get(
  "/product-by-name/:name",
  auth(),
  ProductController.getProductByName,
);

router.patch(
  "/update-product/:id",
  auth(),
  ProductController.updateProductById,
);

router.delete("/delete-products", auth(), ProductController.deleteProducts);

router.delete(
  "/delete-product/:id",
  auth(),
  ProductController.deleteProductById,
);

router.delete(
  "/delete-multiple-products",
  auth(),
  ProductController.deleteMultipleProducts,
);

export const ProductRoute = router;
