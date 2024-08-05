import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleSeeder } from './database/seeders/role.seeder';
import { StatusSeeder } from './database/seeders/status.seeder';
import { TagSeeder } from './database/seeders/tag.seeder';
import { UserSeeder } from './database/seeders/user.seeder';
import { TaskSeeder } from './database/seeders/task.seeder';
import { UserSeeder2 } from './database/seeders/user2.seeder';
import { AdminSeeder } from './database/seeders/admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS actualizada
  app.enableCors({
    origin: [
      'http://localhost:4200', // Permitir solicitudes desde este origen
      'http://localhost:8100'  // Permitir solicitudes desde este origen
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
  console.log('Servidor iniciado en el puerto 3000');
}

bootstrap();
