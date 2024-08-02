import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCreateDto } from 'src/DTO/taskCreate.dto';
import { Task } from 'src/entities/task';
import { User } from 'src/entities/user';
import { Status } from 'src/entities/status';
import { Tag } from 'src/entities/tag';
import { Repository } from 'typeorm';
import { normalizeText } from 'src/utils/normalizeText';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>

    ) {}

    /**
   * Crea una nueva tarea.
   * @param taskCreateDto - DTO que contiene los datos de creación de la tarea.
   * @returns Una promesa que resuelve a la tarea creada.
   */
    async createTask(taskCreateDto: TaskCreateDto): Promise<Task> {
        // Normaliza los campos requeridos
        const normalizedTask = {
            ...taskCreateDto,
            requiredSkillsNormalized: normalizeText(taskCreateDto.requiredSkills),
            requiredExpertiseNormalized: normalizeText(taskCreateDto.requiredExpertise),
            descriptionNormalized: normalizeText(taskCreateDto.description),
        };
    
        // Crea y guarda la nueva tarea
        const newTask = this.taskRepository.create(normalizedTask);
        return this.taskRepository.save(newTask);
    }

    async updateTask(taskId: number, updateDto: TaskCreateDto): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task) {
            throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
        }
    
        // Normaliza los campos si están presentes en el DTO
        if (updateDto.requiredSkills) {
            task.requiredSkills = updateDto.requiredSkills;
            task.requiredSkillsNormalized = normalizeText(updateDto.requiredSkills);
        }
        if (updateDto.requiredExpertise) {
            task.requiredExpertise = updateDto.requiredExpertise;
            task.requiredExpertiseNormalized = normalizeText(updateDto.requiredExpertise);
        }
        if (updateDto.description) {
            task.description = updateDto.description;
            task.descriptionNormalized = normalizeText(updateDto.description);
        }
    
        // Actualiza los demás campos
        Object.assign(task, updateDto);
    
        return this.taskRepository.save(task);
    }

    /**
     * Elimina una tarea por su ID.
     * @param taskId - El ID de la tarea a eliminar.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    async deleteTask(taskId: number): Promise<{ message: string }> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: taskId } });
            if (!task) {
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }
            await this.taskRepository.remove(task);
            return { message: 'Tarea eliminada exitosamente' };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al eliminar la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asigna un usuario a una tarea.
     * @param taskId - El ID de la tarea.
     * @param userId - El ID del usuario a asignar.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    async assignTask(taskId: number, userId: number): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: taskId } });
            if (!task) {
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }

            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }

            task.userId = user.id;
            return await this.taskRepository.save(task);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al asignar el usuario a la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtiene todas las tareas.
     * @returns Una promesa que resuelve a un array de tareas.
     */
    async allTasks(): Promise<Task[]> {
        try {
            return await this.taskRepository.find();
        } catch (error) {
            throw new HttpException('Error al obtener las tareas', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtiene una tarea por su ID.
     * @param taskId - El ID de la tarea a obtener.
     * @returns Una promesa que resuelve a la tarea.
     */
    async oneTask(taskId: number): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: taskId } });
            if (!task) {
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asigna un estado a una tarea.
     * @param statusId - El ID del estado.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    async assignStatus(statusId: number, taskId: number): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: taskId } });
            if (!task) {
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }

            const status = await this.statusRepository.findOne({ where: { id: statusId } });
            if (!status) {
                throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
            }

            task.statusId = status.id;
            return await this.taskRepository.save(task);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al asignar el estado a la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

    async getTasksWithTags(): Promise<Task[]> {
        return await this.taskRepository.find({ relations: ['tags'] });
    }
    
      async getTaskWithTags(taskId: number): Promise<Task> {
        return await this.taskRepository.findOne({ where: { id: taskId }, relations: ['tags'] });
    }

    /**
     * Obtiene las tareas por el ID del estado.
     * @param statusId - El ID del estado para filtrar las tareas.
     * @returns Una promesa que resuelve a un array de tareas.
     */
    async getTasksByStatus(id: number): Promise<Task[]> {
        try {
            return await this.taskRepository.find({ where: { statusId: id}, relations: ['tags'] });
        } catch (error) {
            throw new HttpException('Error al obtener las tareas por estado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asigna una etiqueta a una tarea.
     * @param tagId - El ID de la etiqueta.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    async assignTag(tagId: number, taskId: number): Promise<Task> {
        try {
            // Encuentra la tarea por su ID
            const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['tags'] });
            if (!task) {
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }

            // Encuentra la etiqueta por su ID
            const tag = await this.tagRepository.findOne({ where: { id: tagId } });
            if (!tag) {
                throw new HttpException('Etiqueta no encontrada', HttpStatus.NOT_FOUND);
            }

            // Asigna la etiqueta a la tarea
            if (!task.tags) {
                task.tags = [];
            }
            if (!task.tags.some(t => t.id === tagId)) {
                task.tags.push(tag);
                await this.taskRepository.save(task);
            }

            return task;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al asignar la etiqueta a la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Elimina una etiqueta de una tarea.
     * @param tagId - El ID de la etiqueta.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    async removeTag(tagId: number, taskId: number): Promise<Task> {
        try {
            console.log(`Starting process to remove tag with id ${tagId} from task with id ${taskId}`);
    
            // Encuentra la tarea por su ID incluyendo las relaciones
            const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['tags'] });
            if (!task) {
                console.error('Task not found');
                throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
            }
            console.log('Task found:', task);
    
            // Encuentra la etiqueta por su ID
            const tag = await this.tagRepository.findOne({ where: { id: tagId } });
            if (!tag) {
                console.error('Tag not found');
                throw new HttpException('Etiqueta no encontrada', HttpStatus.NOT_FOUND);
            }
            console.log('Tag found:', tag);
    
            // Utiliza QueryBuilder para eliminar la etiqueta de la relación ManyToMany
            await this.taskRepository
                .createQueryBuilder()
                .relation(Task, 'tags')
                .of(task)
                .remove(tag);
    
            // Vuelve a obtener la tarea para asegurar que los cambios se reflejan
            const updatedTask = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['tags'] });
            console.log('Updated task:', updatedTask);
    
            console.log('Tag with id', tagId, 'removed from task with id', taskId);
            return updatedTask;
        } catch (error) {
            console.error('Error in removeTag method:', error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al eliminar la etiqueta de la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
