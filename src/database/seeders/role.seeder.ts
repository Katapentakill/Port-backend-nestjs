import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Role } from '../../entities/role';

@Injectable()
export class RoleSeeder {
  private readonly logger = new Logger(RoleSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const roleRepository = this.connection.getRepository(Role);

      // Datos de ejemplo
      const roles = [
        { name: 'User' },
        { name: 'Admin' },
      ];

      for (const roleData of roles) {
        const role = roleRepository.create(roleData);
        await roleRepository.save(role);
        this.logger.log(`Seeded role: ${role.name}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed roles: ${error.message}`, error.stack);
    }
  }
}
