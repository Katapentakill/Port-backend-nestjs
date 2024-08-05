import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../DTO/auth.dto';
import { Response } from 'express';
import { CreateUserDto } from 'src/DTO/createUserDto';

/**
 * AuthController maneja las solicitudes relacionadas con la autenticación.
 * Aquí se define un endpoint para registrar nuevos usuarios.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * ? Maneja la solicitud POST para registrar un nuevo usuario.
   * @param authDto - Objeto que contiene el email y la contraseña del nuevo usuario.
   * @param res - El objeto de respuesta.
   * @returns - Respuesta con estado HTTP y mensaje.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(createUserDto);
      res.status(HttpStatus.CREATED).json(user); // Devuelve el usuario registrado
    } catch (error) {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }


  /**
   * ? Maneja la solicitud POST para el inicio de sesión de un usuario.
   * @param authDto - Objeto que contiene el email y la contraseña del usuario.
   * @param res - El objeto de respuesta.
   * @returns - Respuesta con estado HTTP y mensaje.
   */
  @Post('login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(authDto);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
