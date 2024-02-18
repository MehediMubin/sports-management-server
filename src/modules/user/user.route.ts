import { Router } from "express";
import auth from "../../middleware/auth";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-user", auth("superAdmin"), UserController.createUser);

export const UserRoute = router;
