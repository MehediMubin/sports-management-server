import { Router } from "express";
import auth from "../../middleware/auth";
import { SalesController } from "./sales.controller";

const router = Router();

router.post("/sell-product", auth(), SalesController.sellProduct);

router.get("/history", auth(), SalesController.getHistory);

router.get("/history-daily", auth(), SalesController.getHistoryDaily);

router.get("/history-weekly", auth(), SalesController.getHistoryWeekly);

router.get("/history-monthly", auth(), SalesController.getHistoryMonthly);

router.get("/history-yearly", auth(), SalesController.getHistoryYearly);

export const SalesRoute = router;
