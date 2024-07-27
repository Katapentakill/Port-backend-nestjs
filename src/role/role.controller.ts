import { Controller, Post, Body, Get, Delete, Put, Param, Res, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/entities/role';
import { Response } from 'express';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    /**
     * ! Endpoint para obtener todos los roles.
     * @param res - Objeto de respuesta HTTP.
     * @returns Una lista de todos los roles.
     */
    @Get('allRoles')
    async allRoles(@Res() res: Response): Promise<void> {
        try {
            const roles = await this.roleService.getAllRoles();
            res.status(HttpStatus.OK).json(roles);
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * ! Endpoint para eliminar un rol específico.
     * @param roleId - ID del rol a eliminar.
     * @param res - Objeto de respuesta HTTP.
     * @returns Un mensaje indicando el resultado de la operación.
     */
    @Delete('deleteRole/:role_id')
    async deleteRole(@Param('role_id') roleId: number, @Res() res: Response): Promise<void> {
        try {
            const message = await this.roleService.deleteRole(roleId);
            res.status(HttpStatus.OK).json({ message });
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * ! Endpoint para actualizar un rol específico.
     * @param roleId - ID del rol a actualizar.
     * @param body - Objeto con los datos del rol a actualizar (nombre).
     * @param res - Objeto de respuesta HTTP.
     * @returns El rol actualizado.
     */
    @Put('updateRole/:role_id')
    async updateRole(@Param('role_id') roleId: number, @Body() body: { name: string }, @Res() res: Response): Promise<void> {
        try {
            const role = await this.roleService.updateRole(roleId, body);
            res.status(HttpStatus.OK).json(role);
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    /**
     * ! Endpoint para crear un nuevo rol.
     * @param body - Objeto con los datos del nuevo rol (nombre).
     * @param res - Objeto de respuesta HTTP.
     * @returns El rol creado.
     */
    @Post('createRole')
    async createRole(@Body() body: { name: string }, @Res() res: Response): Promise<void> {
        try {
            const role = await this.roleService.createRole(body);
            res.status(HttpStatus.CREATED).json(role);
        } catch (error) {
            res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
