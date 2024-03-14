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
  "/history-all-time",
  // auth("superAdmin", "branchManager"),
  SalesController.getSalesHistoryAllTime,
);

router.get(
  "/history-today",
  // auth("superAdmin", "branchManager"),
  SalesController.getSalesHistoryToday,
);

router.get(
  "/history-weekly",
  // auth("superAdmin", "branchManager"),
  SalesController.getSalesHistoryThisWeek,
);

router.get(
  "/history-monthly",
  // auth("superAdmin", "branchManager"),
  SalesController.getSalesHistoryThisMonth,
);

router.get(
  "/history-yearly",
  // auth("superAdmin", "branchManager"),
  SalesController.getHistoryYearly,
);

export const SalesRoute = router;
