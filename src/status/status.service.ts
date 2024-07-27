import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/status';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) {}

    /**
     * Obtiene todos los estados.
     * @returns Una promesa que resuelve a un array de estados.
     */
    async allStatus(): Promise<Status[]> {
        try {
            return await this.statusRepository.find();
        } catch (error) {
            throw new HttpException('Error al obtener los estados', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Elimina un estado por su ID.
     * @param statusId - El ID del estado a eliminar.
     * @returns Una promesa que resuelve a un objeto que contiene un mensaje y un estado HTTP.
     */
    async deleteStatus(statusId: number): Promise<{ message: string, status: HttpStatus }> {
        try {
            const existStatus = await this.statusRepository.findOne({ where: { id: statusId } });
            if (!existStatus) {
                throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
            }
            await this.statusRepository.remove(existStatus);
            return { message: 'Estado eliminado exitosamente', status: HttpStatus.OK };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al eliminar el estado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Actualiza un estado.
     * @param status - La entidad de estado con los datos actualizados.
     * @returns Una promesa que resuelve a un objeto que contiene un mensaje y un estado HTTP.
     */
    async update(status: Status): Promise<{ message: string, status: HttpStatus }> {
        const { id, name } = status;
        try {
            const existStatus = await this.statusRepository.findOne({ where: { id } });
            if (!existStatus) {
                throw new HttpException('Estado no encontrado', HttpStatus.NOT_FOUND);
            }
            existStatus.name = name;
            await this.statusRepository.save(existStatus);
            return { message: 'Estado actualizado exitosamente', status: HttpStatus.OK };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al actualizar el estado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Crea un nuevo estado.
     * @param name - El nombre del estado a crear.
     * @returns Una promesa que resuelve a un objeto que contiene un mensaje y un estado HTTP.
     */
    async createStatus(name: string): Promise<{ message: string, status: HttpStatus }> {
        if (!name) {
            throw new HttpException('El nombre es requerido', HttpStatus.BAD_REQUEST);
        }
        try {
            const newStatus = this.statusRepository.create({ name });
            await this.statusRepository.save(newStatus);
            return { message: 'Estado creado exitosamente', status: HttpStatus.CREATED };
        } catch (error) {
            throw new HttpException('Error al crear el estado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allStatusWithTasks(): Promise<Status[]> {
        return this.statusRepository.find({ relations: ['tasks'] });
    }

}
