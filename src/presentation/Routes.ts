import { Router } from "express";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}