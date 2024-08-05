import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para asignar roles a las rutas.
 * @param roles - Los roles requeridos para acceder a la ruta.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
