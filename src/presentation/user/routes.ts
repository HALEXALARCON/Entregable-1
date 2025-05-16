import { Router } from "express";
import { UserController } from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";

export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const loginUserService = new LoginUserService();
    const creatorUserService = new CreatorUserService();
    const controller = new UserController(creatorUserService, loginUserService);

    router.post('/register', controller.register)
    router.post('/login', controller.login)

    return router;
  }
}