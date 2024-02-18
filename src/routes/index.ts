import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { ProductRoute } from "../modules/product/product.route";
import { SalesRoute } from "../modules/sales/sales.route";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/products",
    route: ProductRoute,
  },
  {
    path: "/sales",
    route: SalesRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
