import { Logger, Controller, Get, Delete, Param, Put, UseInterceptors, UploadedFile, Res, HttpStatus, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/DTO/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { Response } from 'express';
import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

  /**
   * TODO
   * Obtiene todos los usuarios.
   * @returns Una promesa que resuelve a una lista de objetos UserDto.
   */
  @Get('allUsers')
  async allUsers(): Promise<UserDto[]> {
    return this.userService.allUsers();
  }

  /**
   * TODO
   * Obtiene un usuario específico por su ID.
   * @param userId El ID del usuario a obtener.
   * @returns Una promesa que resuelve a un objeto UserDto.
   */
  @Get('userById/:user_id')
  async oneUser(@Param('user_id') userId: number): Promise<UserDto> {
    return this.userService.oneUser(userId);
  }

  /**
   * TODO
   * Elimina un usuario específico por su ID.
   * @param userId El ID del usuario a eliminar.
   * @returns Un objeto con un mensaje de éxito.
   */
  @Delete('deleteUser/:user_id')
  async deleteUser(@Param('user_id') userId: number): Promise<{ message: string }> {
    const result = await this.userService.deleteUser(userId);
    return { message: result };
  }

  /**
   * TODO
   * Sube una nueva imagen para un usuario específico.
   * @param userId El ID del usuario para el cual se subirá la imagen.
   * @param file El archivo de imagen que se sube.
   * @param res La respuesta HTTP para enviar una respuesta al cliente.
   * @returns Una respuesta HTTP con el usuario actualizado y la URL de la imagen.
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

  /**
   * TODO
   * Crea un nuevo usuario con los datos proporcionados.
   * @param createUserDto Los datos para crear el nuevo usuario.
   * @returns Una promesa que resuelve a un objeto UserDto del usuario creado.
   */
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  /**
   * Actualiza los datos de un usuario específico.
   * @param userId El ID del usuario a actualizar.
   * @param updateUserDto Los datos para actualizar el usuario.
   * @returns Una promesa que resuelve a un objeto UserDto con los datos actualizados.
   */
  @Put('updateUser/:user_id')
  async updateUser(@Param('user_id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(userId, updateUserDto);
  }

  /**
   * TODO
   * Busca usuarios según los criterios proporcionados.
   * @param name El nombre del usuario a buscar.
   * @param lastname El apellido del usuario a buscar.
   * @param email El email del usuario a buscar.
   * @param job El trabajo del usuario a buscar.
   * @returns Una promesa que resuelve a una lista de objetos UserDto que coinciden con los criterios de búsqueda.
   */
  @Get('search')
  async searchUsers(@Query('name') name: string, @Query('lastname') lastname: string, @Query('email') email: string, @Query('job') job: string): Promise<UserDto[]> {
    return this.userService.searchUsers({ name, lastname, email, job });
  }
}
