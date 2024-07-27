import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { JwtStrategy } from './jwt.strategy'; // Estrategia para manejar JWT

/**
 * AuthModule encapsula la funcionalidad de autenticación.
 * Importa los módulos necesarios y proporciona los servicios y controladores relacionados.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), // Importa los repositorios de User y Role
    JwtModule.register({
      secret: '7863', // Clave secreta para firmar el JWT. Debe ser segura en producción.
      signOptions: { expiresIn: '60m' }, // Tiempo de expiración del token
    }),
  ],
  providers: [AuthService, JwtStrategy], // Proveedores de servicios y estrategias
  controllers: [AuthController], // Controladores para manejar las solicitudes
})
export class AuthModule {}
