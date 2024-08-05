import { Controller, Post, Body } from '@nestjs/common';
import { TaskSimilarityService } from './task-similarity.service';

interface TaskDescriptionDto {
  requiredSkillsNormalized: string;
  requiredExpertiseNormalized: string;
  descriptionNormalized: string;
}

@Controller('task-similarity')
export class TaskSimilarityController {
  constructor(private readonly taskSimilarityService: TaskSimilarityService) {}

  /**
   * TODO
   * Endpoint para obtener la similitud entre descripciones de tareas.
   * @param body - Objeto que contiene las descripciones normalizadas de habilidades, experiencia y tarea.
   * @returns Una promesa que resuelve con el resultado de la similitud calculada por el servicio.
   */
  @Post()
  async getSimilarity(@Body() body: TaskDescriptionDto) {
    const { requiredSkillsNormalized, requiredExpertiseNormalized, descriptionNormalized } = body;
    return this.taskSimilarityService.getSimilarity(requiredSkillsNormalized, requiredExpertiseNormalized, descriptionNormalized);
  }
}
