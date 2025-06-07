import { envs } from '../config/env';
import { PostgresDatabase } from './postgres/postgres-database';


// Instancia global de la base de datos
export const postgres = new PostgresDatabase({
  username: envs.db.USERNAME,
  password: envs.db.PASSWORD,
  host: envs.db.HOST,
  port: envs.db.PORT,
  database: envs.db.NAME,
});

export * from './postgres/postgres-database';
export * from './postgres/models/User.model';
export * from './postgres/models/Pet-post-model';
