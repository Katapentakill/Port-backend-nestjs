import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../entities/user';
import { Role } from '../../entities/role';

@Injectable()
export class UserSeeder {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const userRepository = this.connection.getRepository(User);
      const roleRepository = this.connection.getRepository(Role);

      // Buscar el rol "Admin"
      const adminRole = await roleRepository.findOne({ where: { name: 'Admin' } });

      if (!adminRole) {
        throw new Error('Role "Admin" not found');
      }

      // Datos de ejemplo para el usuario
      const users = [
        {
          email: 'admin@example.com',
          password: 'securepassword', // Asegúrate de encriptar las contraseñas en producción
          role: adminRole,
          roleId: adminRole.id,
        },
      ];

      for (const userData of users) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        this.logger.log(`Seeded user: ${user.email} with role: ${adminRole.name}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed users: ${error.message}`, error.stack);
    }
  }
}