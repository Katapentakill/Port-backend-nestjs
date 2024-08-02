// task-similarity.controller.ts
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

  @Post()
  async getSimilarity(@Body() body: TaskDescriptionDto) {
    const { requiredSkillsNormalized, requiredExpertiseNormalized, descriptionNormalized } = body;
    return this.taskSimilarityService.getSimilarity(requiredSkillsNormalized, requiredExpertiseNormalized, descriptionNormalized);
  }
}
