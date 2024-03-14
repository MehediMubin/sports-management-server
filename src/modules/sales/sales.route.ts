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
  auth("superAdmin", "branchManager"),
  SalesController.getHistory,
);

router.get(
  "/history-daily",
  auth("superAdmin", "branchManager"),
  SalesController.getHistoryDaily,
);

router.get(
  "/history-weekly",
  auth("superAdmin", "branchManager"),
  SalesController.getHistoryWeekly,
);

router.get(
  "/history-monthly",
  auth("superAdmin", "branchManager"),
  SalesController.getHistoryMonthly,
);

router.get(
  "/history-yearly",
  auth("superAdmin", "branchManager"),
  SalesController.getHistoryYearly,
);

router.get(
  "/branch-history",
  // auth("superAdmin", "branchManager"),
  SalesController.getBranchHistory,
);

export const SalesRoute = router;
