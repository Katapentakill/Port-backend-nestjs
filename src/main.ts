import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleSeeder } from './database/seeders/role.seeder';
import { StatusSeeder } from './database/seeders/status.seeder';
import { TagSeeder } from './database/seeders/tag.seeder';
import { UserSeeder } from './database/seeders/user.seeder';
import { TaskSeeder } from './database/seeders/task.seeder';
import { UserSeeder2 } from './database/seeders/user2.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  

  // Inicia el servidor después de ejecutar los seeders
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
  console.log('Servidor iniciado en el puerto 3000');
}

bootstrap();
