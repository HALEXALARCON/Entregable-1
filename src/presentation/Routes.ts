import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { petPostRoutes } from "./pet-Post/router";
import { AuthMiddleware } from "./common/errors/middlewares/auth.middleware";


// Router principal
const router = Router();

// Rutas públicas
router.use("/api/users", UserRoutes.routes);

// Rutas protegidas (requieren autenticación)
router.use("/api/pet-posts", AuthMiddleware.protect, petPostRoutes.routes);

// Exporto el router
export const routes = router;
