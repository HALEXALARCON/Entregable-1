import { DataSource } from 'typeorm';
import { User } from './models/User.model';
import { PetPost } from './models/Pet-post-model';

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  public datasource: DataSource;

  constructor(options: Options) {
    const isProduction = process.env.NODE_ENV === 'production' || true;

    this.datasource = new DataSource({
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      logging: false,
      entities: [User, PetPost],

      // ⚠️ Configuración SSL para Neon
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // Neon usa certificados self-signed
        },
      },
    });
  }

  async connect() {
    try {
      if (!this.datasource.isInitialized) {
        await this.datasource.initialize();
        console.log('✅ Postgres database connected!');
      }
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error);
      throw error;
    }
  }
}
