import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Tag } from '../../entities/tag';

@Injectable()
export class TagSeeder {
  private readonly logger = new Logger(TagSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const tagRepository = this.connection.getRepository(Tag);

      // Datos de ejemplo con colores
      const tags = [
        { name: 'Iniciada', color: '#FF0000' },     // Rojo
        { name: 'Desarrollo', color: '#00FF00' },   // Verde
        { name: 'Pruebas', color: '#0000FF' },      // Azul
        { name: 'Finalizada', color: '#FFFF00' },   // Amarillo
      ];

      for (const tagData of tags) {
        const tag = tagRepository.create(tagData);
        await tagRepository.save(tag);
        this.logger.log(`Seeded tag: ${tag.name} with color: ${tag.color}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed tags: ${error.message}`, error.stack);
    }
  }
}
