import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleSeeder } from './database/seeders/role.seeder';
import { StatusSeeder } from './database/seeders/status.seeder';
import { TagSeeder } from './database/seeders/tag.seeder';
import { UserSeeder } from './database/seeders/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Inyección directa de los seeders
  /**
   * const userSeeder = app.get(UserSeeder)
   * const roleSeeder = app.get(RoleSeeder);
  const statusSeeder = app.get(StatusSeeder);
  const tagSeeder = app.get(TagSeeder);

  try {
    await userSeeder.run()
    await roleSeeder.run();
    await statusSeeder.run();
    await tagSeeder.run();
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`, error.stack);
  }*/
  app.enableCors({
      origin: 'http://localhost:4200', // Permitir solicitudes desde este origen
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    
  await app.listen(3000);
}
bootstrap();
