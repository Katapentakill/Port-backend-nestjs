import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  async getRecommendations(
    @Body() body: { taskName: string; taskDescription: string }
  ): Promise<any[]> {
    const { taskName, taskDescription } = body;

    if (!taskName || !taskDescription) {
      throw new Error('Task name and description must be provided.');
    }

    return this.recommendationsService.generateDescription(taskName, taskDescription);
  }
}
