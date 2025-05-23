import express, { Request, Response, NextFunction, Router } from "express";
import "reflect-metadata";
import { PostgresDatabase } from "../data";
import { envs } from "../config/env";


interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    // 1) Conectar BD (configurada internamente con synchronize/logging si quieres)
    const postgres = new PostgresDatabase({
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      host: envs.DATABASE_HOST,
      port: Number(envs.DATABASE_PORT),
      database: envs.DATABASE_NAME,
    });
    await postgres.connect();

    // 2) Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // 3) Ping para comprobar servidor
    this.app.get("/ping", (_req, res) => res.json({ pong: true }));

    // 4) Montar rutas
    this.app.use(this.routes);

    // 5) 404 handler
    this.app.use((_req, res) => {
      res.status(404).json({ message: "Not Found" });
    });

    // 6) Error handler global
    // 4 args para que Express lo reconozca
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error("Unhandled error:", err.stack ?? err);
      res.status(500).json({ message: "Internal server error" });
    });

    // 7) Arrancar
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }
}
