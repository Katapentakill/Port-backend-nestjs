import { Logger, Controller, Get, Delete, Param, Put, UseInterceptors, UploadedFile, Res, HttpStatus, Post, Body } from '@nestjs/common';
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

  @Get('allUsers')
  async allUsers(): Promise<UserDto[]> {
    return this.userService.allUsers();
  }

  @Get('userById/:user_id')
  async oneUser(@Param('user_id') userId: number): Promise<UserDto> {
    return this.userService.oneUser(userId);
  }

  @Delete('deleteUser/:user_id')
  async deleteUser(@Param('user_id') userId: number): Promise<string> {
    return this.userService.deleteUser(userId);
  }

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

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Put('updateUser/:user_id')
  async updateUser(@Param('user_id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(userId, updateUserDto);
  }
}
