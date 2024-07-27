import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Task } from 'src/entities/task';
import { Tag } from 'src/entities/tag';
import { Status } from 'src/entities/status';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, Tag, Status])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
