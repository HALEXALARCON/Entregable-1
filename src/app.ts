import "reflect-metadata";
import { PostgresDatabase } from "./data";
import { envs } from "./config/env";
import { routes } from "./presentation/routes";
import { Server } from "./presentation/server";

async function main() {
  const postgres = new PostgresDatabase({
    username: envs.db.USERNAME,
    password: envs.db.PASSWORD,
    host: envs.db.HOST,
    port: envs.db.PORT,
    database: envs.db.NAME,
  });

  await postgres.connect();

  const server = new Server({
    port: envs.app.PORT,
    routes,
  });

  await server.start();
}

main();
