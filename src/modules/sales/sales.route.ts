import { Router } from "express";
import auth from "../../middleware/auth";
import { SalesController } from "./sales.controller";

const router = Router();

router.post(
  "/sell-product",
  auth("superAdmin", "seller"),
  SalesController.sellProduct,
);

router.get(
  "/history",
  auth("superAdmin", "branchManager", "seller"),
  SalesController.getHistory,
);

router.get(
  "/history-daily",
  auth("superAdmin", "branchManager", "seller"),
  SalesController.getHistoryDaily,
);

router.get(
  "/history-weekly",
  auth("superAdmin", "branchManager", "seller"),
  SalesController.getHistoryWeekly,
);

router.get(
  "/history-monthly",
  auth("superAdmin", "branchManager", "seller"),
  SalesController.getHistoryMonthly,
);

router.get(
  "/history-yearly",
  auth("superAdmin", "branchManager", "seller"),
  SalesController.getHistoryYearly,
);

export const SalesRoute = router;
