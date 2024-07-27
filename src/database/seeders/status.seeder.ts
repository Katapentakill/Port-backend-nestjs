import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Status } from '../../entities/status';

@Injectable()
export class StatusSeeder {
  private readonly logger = new Logger(StatusSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const statusRepository = this.connection.getRepository(Status);

      // Datos de ejemplo
      const statuses = [
        { name: 'Pendiente' },
        { name: 'En Progreso' },
        { name: 'Completada' },
      ];

      for (const statusData of statuses) {
        const status = statusRepository.create(statusData);
        await statusRepository.save(status);
        this.logger.log(`Seeded status: ${status.name}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed statuses: ${error.message}`, error.stack);
    }
  }
}
