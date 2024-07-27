import { Logger, Controller, Get, Delete, Param, Put, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/DTO/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly imageService: ImageService,
    ) {}

    /**
     * ? Endpoint para obtener todos los usuarios.
     * @returns Una promesa que resuelve a un array de objetos UserDto.
     */
    @Get('allUsers')
    async allUsers(): Promise<UserDto[]> {
        return this.userService.allUsers();
    }

    /**
     * ? Endpoint para obtener un usuario por su ID.
     * @param userId - El ID del usuario a obtener.
     * @returns Una promesa que resuelve a un objeto UserDto.
     */
    @Get('userById/:user_id')
    async oneUser(@Param('user_id') userId: number): Promise<UserDto> {
        return this.userService.oneUser(userId);
    }

    /**
     * ! 2Endpoint para eliminar un usuario por su ID.
     * @param userId - El ID del usuario a eliminar.
     * @returns Una promesa que resuelve a un mensaje de éxito.
     */
    @Delete('deleteUser/:user_id')
    async deleteUser(@Param('user_id') userId: number): Promise<string> {
        return this.userService.deleteUser(userId);
    }

    /**
     * ! Endpoint para subir una imagen de usuario por su ID.
     * @param userId - El ID del usuario al que se le subirá la imagen.
     * @param file - El archivo de imagen subido.
     * @param res - Objeto de respuesta HTTP.
     * @returns Una promesa que resuelve a una respuesta HTTP con el usuario actualizado y la URL de la imagen.
     */
    @Put('uploadUserImage/:user_id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadUserImage(
        @Param('user_id') userId: number,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ): Promise<Response> {
        console.log(`Solicitud recibida para subir imagen para el usuario ${userId}`);
        
        if (!file) {
            console.error('No se recibió ningún archivo');
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se proporcionó ningún archivo' });
        }

        try {
            console.log('Solicitud recibida para subir imagen');
            console.log('Archivo recibido:', file); // Log del archivo recibido
            const result = await this.imageService.uploadImage(file);
            console.log(`Imagen subida con éxito: ${result.secure_url}`);
            
            const user = await this.userService.updateUserImage(userId, result.secure_url);
            console.log(`Imagen del usuario actualizada con éxito: ${JSON.stringify(user)}`);
            
            return res.status(HttpStatus.OK).json({ user, url: result.secure_url });
        } catch (error) {
            console.error(`Error al subir la imagen para el usuario ${userId}: ${error.message}`, error.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
