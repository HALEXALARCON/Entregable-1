import { Server } from './presentation/server';
import { envs } from './config/env';
import { routes } from './presentation/routes';
import { postgres } from './data';


const main = async () => {
  try {
    console.log('⏳ Conectando a la base de datos...');
    await postgres.connect();
    console.log('✅ Base de datos conectada');

    const server = new Server({
      port: envs.app.PORT,
      routes,
    });

    await server.start();
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
  }
};

main();
