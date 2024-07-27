import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repositorio para manejar usuarios
    private readonly jwtService: JwtService, // Servicio para manejar JWT
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token JWT del encabezado de la solicitud
      secretOrKey: '7863', // Clave secreta para verificar el JWT. Debe ser la misma usada para firmar el token
    });
  }

  /**
   * Valida el payload del JWT.
   * @param payload - Información extraída del token JWT.
   * @returns - El usuario correspondiente si es válido, o lanza UnauthorizedException si no.
   */
  async validate(payload: any): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
