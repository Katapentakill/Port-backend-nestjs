import { Controller, Post, Body, Get, Delete, Put, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskCreateDto } from 'src/DTO/taskCreate.dto';
import { Task } from 'src/entities/task';
import { TestTokenGuard } from 'src/common/guards/test-token.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('task')
@UseGuards(TestTokenGuard)
@UseGuards(RolesGuard) // Aplica el guard de roles para asegurar el acceso
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * Endpoint para crear una nueva tarea.
     * @param taskCreateDto - DTO que contiene los datos necesarios para la creación de la tarea.
     * @returns Una promesa que resuelve con la tarea creada.
     */
    @Post('createTask')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async createTask(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
        return this.taskService.createTask(taskCreateDto);
    }

    /**
     * Endpoint para actualizar una tarea existente.
     * @param id - El ID de la tarea a actualizar.
     * @param updateDto - DTO que contiene los datos de actualización de la tarea.
     * @returns Una promesa que resuelve con la tarea actualizada.
     */
    @Put(':id')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async updateTask(
        @Param('id') id: number,
        @Body() updateDto: TaskCreateDto
    ): Promise<Task> {
        return this.taskService.updateTask(id, updateDto);
    }

    /**
     * Endpoint para eliminar una tarea por su ID.
     * @param taskId - El ID de la tarea a eliminar.
     * @returns Una promesa que resuelve con un mensaje de éxito.
     * @throws HttpException si ocurre un error durante la eliminación.
     */
    @Delete(':task_id')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async deleteTask(@Param('task_id') taskId: number): Promise<{ message: string }> {
        try {
            return await this.taskService.deleteTask(taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para asignar un usuario a una tarea.
     * @param taskId - El ID de la tarea.
     * @param userId - El ID del usuario a asignar.
     * @returns Una promesa que resuelve con la tarea actualizada.
     * @throws HttpException si ocurre un error durante la asignación.
     */
    @Put('assign/:task_id/:user_id')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async assignTask(@Param('task_id') taskId: number, @Param('user_id') userId: number): Promise<Task> {
        try {
            return await this.taskService.assignTask(taskId, userId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para obtener todas las tareas.
     * @returns Una promesa que resuelve con un array de tareas.
     * @throws HttpException si ocurre un error durante la obtención.
     */
    @Get('allTasks')
    @Roles('Admin', 'User') // Accesible por usuarios con rol Admin y User
    async allTasks(): Promise<Task[]> {
        try {
            return await this.taskService.allTasks();
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para obtener una tarea por su ID.
     * @param taskId - El ID de la tarea a obtener.
     * @returns Una promesa que resuelve con la tarea.
     * @throws HttpException si ocurre un error durante la obtención.
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
     * Endpoint para asignar un estado a una tarea.
     * @param statusId - El ID del estado a asignar.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve con la tarea actualizada.
     * @throws HttpException si ocurre un error durante la asignación.
     */
    @Put('assignStatus/:status_id/:task_id')
    @Roles('Admin', 'User') // Accesible por usuarios con rol Admin y User
    async assignStatus(@Param('status_id') statusId: number, @Param('task_id') taskId: number): Promise<Task> {
        try {
            return await this.taskService.assignStatus(statusId, taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para asignar una etiqueta a una tarea.
     * @param tagId - El ID de la etiqueta a asignar.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve con la tarea actualizada.
     * @throws HttpException si ocurre un error durante la asignación.
     */
    @Put('assignTag/:tag_id/:task_id')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async assignTag(@Param('tag_id') tagId: number, @Param('task_id') taskId: number): Promise<Task> {
        try {
            return await this.taskService.assignTag(tagId, taskId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para obtener todas las tareas con sus etiquetas.
     * @returns Una promesa que resuelve con un array de tareas con etiquetas.
     */
    @Get()
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async getAllTasks(): Promise<Task[]> {
        return await this.taskService.getTasksWithTags();
    }

    /**
     * Endpoint para obtener una tarea por su ID, incluyendo sus etiquetas.
     * @param taskId - El ID de la tarea a obtener.
     * @returns Una promesa que resuelve con la tarea y sus etiquetas.
     */
    @Get('TagByTask/:task_id')
    @Roles('Admin', 'User') // Accesible por usuarios con rol Admin y User
    async getTaskById(@Param('task_id') taskId: number): Promise<Task> {
        return await this.taskService.getTaskWithTags(taskId);
    }

    /**
     * Endpoint para obtener tareas por el ID del estado.
     * @param statusId - El ID del estado para filtrar las tareas.
     * @returns Una promesa que resuelve con un array de tareas con el estado especificado.
     * @throws HttpException si ocurre un error durante la obtención.
     */
    @Get('byStatus/:status_id')
    @Roles('Admin', 'User') // Accesible por usuarios con rol Admin y User
    async getTasksByStatus(@Param('status_id') statusId: number): Promise<Task[]> {
        try {
            return await this.taskService.getTasksByStatus(statusId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para eliminar una etiqueta de una tarea.
     * @param tagId - El ID de la etiqueta a eliminar.
     * @param taskId - El ID de la tarea.
     * @returns Una promesa que resuelve con la tarea actualizada.
     * @throws HttpException si ocurre un error durante la eliminación.
     */
    @Delete('removeTag/:tag_id/:task_id')
    @Roles('Admin') // Solo accesible por usuarios con rol Admin
    async removeTag(@Param('tag_id') tagId: number, @Param('task_id') taskId: number): Promise<Task> {
        try {
            console.log(`Received request to remove tag with id ${tagId} from task with id ${taskId}`);
            return await this.taskService.removeTag(tagId, taskId);
        } catch (error) {
            console.error('Error en el endpoint removeTag:', error);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
