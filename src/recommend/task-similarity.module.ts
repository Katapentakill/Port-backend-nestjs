import { Module } from '@nestjs/common';
import { TaskSimilarityController } from './task-similarity.controller';
import { TaskSimilarityService } from './task-similarity.service';

@Module({
  controllers: [TaskSimilarityController],
  providers: [TaskSimilarityService],
})
export class TaskSimilarityModule {}
