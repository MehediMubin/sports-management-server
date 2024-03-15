import { Router } from "express";
import auth from "../../middleware/auth";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-user", auth("superAdmin"), UserController.createUser);

router.get("/branch/:username", UserController.getBranch);

export const UserRoute = router;
