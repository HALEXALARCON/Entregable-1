import { Router } from "express";
import UserController from "./controller";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { ModifierUserService } from "./services/modifier-user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    // Instancia de servicios (puedes inyectar repositorios u otros deps aquí)
    const creatorUserService = new CreatorUserService();
    const loginUserService = new LoginUserService();
    const finderUserService = new FinderUserService();
    const modifierUserService = new ModifierUserService();
    const deleteUserService = new DeleteUserService();

    // Controlador configurado con las instancias de servicio
    const controller = new UserController(
      creatorUserService,
      loginUserService,
      finderUserService,
      modifierUserService,
      deleteUserService
    );

    // Definición de rutas
    router.get("/", controller.findAll);
    router.post("/register", controller.register);
    router.post("/login", controller.login);
    router.get("/:id", controller.findOne);
    router.patch("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
