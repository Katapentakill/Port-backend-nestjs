import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Task } from 'src/entities/task';
import { Tag } from 'src/entities/tag';
import { Status } from 'src/entities/status';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task, Tag, Status]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService, RolesGuard],
})
export class TaskModule {}
