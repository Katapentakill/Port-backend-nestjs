import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

/**
 * Guard para manejar la autorización basada en roles en las rutas.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  /**
   * Verifica si el usuario tiene el rol necesario para acceder a la ruta.
   * @param context - El contexto de ejecución de la solicitud.
   * @returns Un valor booleano que indica si se permite o deniega el acceso.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene los roles requeridos de la metadata de la ruta
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No se requieren roles, se permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // No se proporciona autorización
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { role: string };

    // Verifica si el token es válido y si el rol del usuario está en los roles requeridos
    if (!decoded || !requiredRoles.includes(decoded.role)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); // Rol no permitido
    }

    return true;
  }
}
