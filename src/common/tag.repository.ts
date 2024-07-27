import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../entities/task';

@EntityRepository(Task)
export class TagRepositoryWithTag extends Repository<Task> {
  findOneWithTags(taskId: number): Promise<Task> {
    return this.findOne({ where: { id: taskId }, relations: ['tags'] });
  }
}
