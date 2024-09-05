import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleSeeder } from './database/seeders/role.seeder';
import { StatusSeeder } from './database/seeders/status.seeder';
import { TagSeeder } from './database/seeders/tag.seeder';
import { UserSeeder } from './database/seeders/user.seeder';
import { TaskSeeder } from './database/seeders/task.seeder';
import { UserSeeder2 } from './database/seeders/user2.seeder';
import { AdminSeeder } from './database/seeders/admin.seeder';
import { Connection } from 'typeorm';

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

  // Función para ejecutar los seeders
  async function seedDatabase() {
    const connection = app.get(Connection);

    const roleSeeder = new RoleSeeder(connection);
    const statusSeeder = new StatusSeeder(connection);
    const tagSeeder = new TagSeeder(connection);
    const taskSeeder = new TaskSeeder(connection);
    const userSeeder2 = new UserSeeder2(connection);
    const adminSeeder = new AdminSeeder(connection);

    await roleSeeder.run();
    await statusSeeder.run();
    await tagSeeder.run();
    await userSeeder2.run();
    await taskSeeder.run();
    await adminSeeder.run();
  }

  // Inicia el proceso de seed
  await seedDatabase();

  await app.listen(3000);
  console.log('Servidor iniciado en el puerto 3000');
}

bootstrap();