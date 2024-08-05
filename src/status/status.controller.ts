import { Controller, Post, Body, Get, Delete, Put, Param, Res, HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from 'src/entities/status';
import { Response } from 'express';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    /**
     * TODO
     * ? Endpoint para obtener todos los estados.
     * @param res - El objeto de respuesta.
     * @returns Una promesa que resuelve a un array de estados.
     */
    @Get('allStatus')
    async allStatus(@Res() res: Response): Promise<void> {
        try {
            const statuses = await this.statusService.allStatus();
            res.status(HttpStatus.OK).json(statuses);
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * TODO
     * ? Endpoint para eliminar un estado por su ID.
     * @param statusId - El ID del estado a eliminar.
     * @param res - El objeto de respuesta.
     * @returns Una promesa que resuelve a un mensaje de éxito y estado HTTP.
     */
    @Delete('deleteStatus/:status_id')
    async deleteStatus(@Param('status_id') statusId: number, @Res() res: Response): Promise<void> {
        try {
            const { message, status } = await this.statusService.deleteStatus(statusId);
            res.status(status).json({ message });
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * TODO
     * ! Endpoint para actualizar un estado.
     * @param status - La entidad de estado con los datos actualizados.
     * @param res - El objeto de respuesta.
     * @returns Una promesa que resuelve a un mensaje de éxito y estado HTTP.
     */
    @Put('updateStatus')
    async updateStatus(@Body() status: Status, @Res() res: Response): Promise<void> {
        try {
            const { message, status: httpStatus } = await this.statusService.update(status);
            res.status(httpStatus).json({ message });
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * TODO
     * ? Endpoint para crear un nuevo estado.
     * @param name - El nombre del estado a crear.
     * @param res - El objeto de respuesta.
     * @returns Una promesa que resuelve a un mensaje de éxito y estado HTTP.
     */
    @Post('createStatus')
    async createStatus(@Body('name') name: string, @Res() res: Response): Promise<void> {
        console.log('Nombre del estado recibido en el backend:', name); // Log en el backend
        try {
        const { message, status } = await this.statusService.createStatus(name);
        res.status(status).json({ message });
        } catch (error) {
        res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
