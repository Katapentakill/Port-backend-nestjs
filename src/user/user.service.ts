import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserMapper } from 'src/common/map/user.map';
import { UserDto } from 'src/DTO/user.dto';
import { User } from 'src/entities/user';
import { normalizeText } from '../utils/normalizeText';
import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { Role } from 'src/entities/role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Obtiene todos los usuarios excluyendo aquellos con el rol "Admin".
   * @returns Una promesa que resuelve a una lista de objetos UserDto.
   */
  async allUsers(): Promise<UserDto[]> {
    try {
      // Obtener el rol "Admin"
      const adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });
      if (!adminRole) {
        throw new Error('Role "Admin" not found');
      }

      // Obtener todos los usuarios, excluyendo los que tienen el rol "Admin"
      const users = await this.userRepository.find({ where: { roleId: Not(adminRole.id) } });
      return users.map(UserMapper.toUserDto);
    } catch (error) {
      throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Busca usuarios según los criterios proporcionados.
   * @param query Criterios de búsqueda como nombre, apellido, email y/o trabajo.
   * @returns Una promesa que resuelve a una lista de objetos UserDto.
   */
  async searchUsers(query: { name?: string, lastname?: string, email?: string, job?: string }): Promise<UserDto[]> {
    try {
      // Obtener usuarios según los criterios de búsqueda
      const users = await this.userRepository.find({
        where: [
          query.name ? { name: query.name } : {},
          query.lastname ? { lastname: query.lastname } : {},
          query.email ? { email: query.email } : {},
          query.job ? { job: query.job } : {},
        ],
        relations: ['role'], // Asegúrate de incluir la relación con Role
      });

      // Filtrar usuarios para excluir aquellos cuyo rol es "Admin"
      const adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });
      const adminRoleId = adminRole ? adminRole.id : null;

      const filteredUsers = users.filter(user => user.roleId !== adminRoleId);

      return filteredUsers.map(UserMapper.toUserDto);
    } catch (error) {
      throw new HttpException('Error al buscar usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param userId El ID del usuario a obtener.
   * @returns Una promesa que resuelve a un objeto UserDto.
   */
  async oneUser(userId: number): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return UserMapper.toUserDto(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Elimina un usuario específico por su ID.
   * @param userId El ID del usuario a eliminar.
   * @returns Un mensaje de éxito en caso de eliminación exitosa.
   */
  async deleteUser(userId: number): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.remove(user);
      return 'Usuario eliminado con éxito';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Actualiza la imagen de un usuario específico.
   * @param userId El ID del usuario a actualizar.
   * @param imageUrl La URL de la nueva imagen del usuario.
   * @returns Una promesa que resuelve a un objeto UserDto con la imagen actualizada.
   */
  async updateUserImage(userId: number, imageUrl: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        console.warn(`Usuario no encontrado: ${userId}`);
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      user.image = imageUrl;
      await this.userRepository.save(user);
      return UserMapper.toUserDto(user);
    } catch (error) {
      console.error('Error al actualizar la imagen del usuario', error.stack);
      throw new HttpException('Error al actualizar la imagen del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Crea un nuevo usuario con los datos proporcionados.
   * @param createUserDto Los datos para crear el nuevo usuario.
   * @returns Una promesa que resuelve a un objeto UserDto del usuario creado.
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
        console.log('Creando usuario con DTO:', createUserDto);

        // Normalizar los campos de texto para el currículum, habilidades y experiencia
        createUserDto.curriculumNormalized = normalizeText(createUserDto.curriculum);
        createUserDto.skillsNormalized = normalizeText(createUserDto.skills);
        createUserDto.expertiseNormalized = normalizeText(createUserDto.expertise);

        console.log('DTO normalizado:', createUserDto);

        // Crear y guardar el nuevo usuario
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);

        return UserMapper.toUserDto(user);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Actualiza los datos de un usuario específico.
   * @param sid El ID del usuario a actualizar.
   * @param updateUserDto Los datos para actualizar el usuario.
   * @returns Una promesa que resuelve a un objeto UserDto con los datos actualizados.
   */
  async update(sid: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      // Normalizar los campos de texto para el currículum, habilidades y experiencia
      updateUserDto.curriculumNormalized = normalizeText(updateUserDto.curriculum);
      updateUserDto.skillsNormalized = normalizeText(updateUserDto.skills);
      updateUserDto.expertiseNormalized = normalizeText(updateUserDto.expertise);

      // Actualizar el usuario con los nuevos datos
      await this.userRepository.update(sid, updateUserDto);
      const updatedUser = await this.userRepository.findOne({ where: { id: sid } });
      return UserMapper.toUserDto(updatedUser);
    } catch (error) {
      throw new HttpException('Error al actualizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
