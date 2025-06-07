import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../../config/jwt.adapter";
import { User, userRole } from "../../../../data";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    let token = req.cookies?.token;

    // Si no hay cookie, intenta obtener el token del header Authorization
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };

      if (!payload) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      // Aseguramos que req.body exista
      if (!req.body) {
        req.body = {};
      }

      // Guardamos el usuario en el request para uso posterior
      req.body.sessionUser = user;
      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static restrictToAdmin = (...roles: userRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.body.sessionUser;

      if (!user || !roles.includes(user.rol)) {
        return res.status(403).json({
          message: "You are not authorized to access this route",
        });
      }

      next();
    };
  };
}
