import { Controller, Post, Body, Get, Delete, Put, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from 'src/DTO/taskCreate.dto';
import { Task } from 'src/entities/task';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * ? Endpoint para crear una nueva tarea.
     * @param taskCreateDto - DTO que contiene los datos de creación de la tarea.
     * @returns Una promesa que resuelve a la tarea creada.
     */
    @Post('createTask')
    async createTask(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
    console.log('Datos recibidos en createTask Controller:', taskCreateDto); // Log de entrada

    try {
        return await this.taskService.createTask(taskCreateDto);
    } catch (error) {
        console.error('Error en createTask Controller:', error); // Log de errores
        throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    /**
     * ? Endpoint para eliminar una tarea por su ID.
     * @param taskId - El ID de la tarea a eliminar.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    @Delete(':task_id')
    async deleteTask(@Param('task_id') taskId: number): Promise<{ message: string }> {
        try {
            return await this.taskService.deleteTask(taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ? Endpoint para asignar un usuario a una tarea.
     * @param taskId - El ID de la tarea.
     * @param userId - El ID del usuario a asignar.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    @Put('assign/:task_id/:user_id')
    async assignTask(@Param('task_id') taskId: number, @Param('user_id') userId: number): Promise<Task> {
        try {
            return await this.taskService.assignTask(taskId, userId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ? Endpoint para obtener todas las tareas.
     * @returns Una promesa que resuelve a un array de tareas.
     */
    @Get('allTasks')
    async allTasks(): Promise<Task[]> {
        try {
            return await this.taskService.allTasks();
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ! Endpoint para obtener una tarea por su ID.
     * @param taskId - El ID de la tarea a obtener.
     * @returns Una promesa que resuelve a la tarea.
     */
    @Get('oneTask/:task_id')
    async oneTask(@Param('task_id') taskId: number): Promise<Task> {
        try {
            return await this.taskService.oneTask(taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ? Endpoint para asignar un estado a una tarea.
     * @param statusId - El ID del estado.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    @Put('assignStatus/:status_id/:task_id')
    async assignStatus(@Param('status_id') statusId: number, @Param('task_id') taskId: number): Promise<Task> {
        try {
            return await this.taskService.assignStatus(statusId, taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ! Endpoint para asignar una etiqueta a una tarea.
     * @param tagId - El ID de la etiqueta.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    @Put('assignTag/:tag_id/:task_id')
    async assignTag(@Param('tag_id') tagId: number, @Param('task_id') taskId: number): Promise<Task> {
        try {
            return await this.taskService.assignTag(tagId, taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.taskService.getTasksWithTags();
    }

    @Get('TagByTask/:task_id')
    async getTaskById(@Param('task_id') taskId: number): Promise<Task> {
        return await this.taskService.getTaskWithTags(taskId);
    }

    @Get('byStatus/:status_id')
    async getTasksByStatus(@Param('status_id') statusId: number): Promise<Task[]> {
        try {
            return await this.taskService.getTasksByStatus(statusId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * ! Endpoint para eliminar una etiqueta de una tarea.
     * @param tagId - El ID de la etiqueta.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve a la tarea actualizada.
     */
    @Delete('removeTag/:tag_id/:task_id')
    async removeTag(@Param('tag_id') tagId: number, @Param('task_id') taskId: number): Promise<Task> {
    try {
        console.log(`Received request to remove tag with id ${tagId} from task with id ${taskId}`);
        return await this.taskService.removeTag(tagId, taskId);
    } catch (error) {
        console.error('Error in removeTag endpoint:', error);
        throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
}
