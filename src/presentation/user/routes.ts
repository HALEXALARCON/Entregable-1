import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";

export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const creatorUserService = new CreatorUserService();

    const controller = new UserController(creatorUserService);

    router.post('/register', controller.register)

    return router;
  }
}