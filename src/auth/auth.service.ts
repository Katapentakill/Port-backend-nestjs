import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user';
import { AuthDto } from '../DTO/auth.dto';
import { Role } from '../entities/role';
import { CreateUserDto } from 'src/DTO/createUserDto';
import { normalizeText } from 'src/utils/normalizeText';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repositorio para manejar usuarios
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>, // Repositorio para manejar roles
    private readonly jwtService: JwtService, // Servicio para manejar JWT
  ) {}

  /**
   * Maneja el inicio de sesión de un usuario.
   * @param authDto - Objeto que contiene el email y la contraseña del usuario.
   * @returns - Objeto que contiene el token JWT generado.
   * @throws - HttpException si los datos son incorrectos o inexistentes.
   */
  async login(authDto: AuthDto) {
    const { email, password } = authDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (!existingUser) {
      throw new HttpException('Datos mal ingresados o inexistentes', HttpStatus.BAD_REQUEST);
    }

    const passwordEqual = await bcrypt.compare(password, existingUser.password);
    if (!passwordEqual) {
      throw new HttpException('Datos mal ingresados o inexistentes', HttpStatus.BAD_REQUEST);
    }

    const userRole = await this.roleRepository.findOne({ where: { id: existingUser.roleId } });
    if (!userRole) {
      throw new HttpException('Datos mal ingresados o inexistentes', HttpStatus.BAD_REQUEST);
    }

    const payload = { email: existingUser.email, sub: existingUser.id, role: userRole.name };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  /**
   * Registra un nuevo usuario, asigna el rol por defecto y genera un token JWT.
   * @param authDto - Objeto que contiene el email y la contraseña del nuevo usuario.
   * @returns - Objeto que contiene el token JWT generado.
   * @throws - HttpException si el usuario ya existe o si el rol no se encuentra.
   */
  /**
   * Registra un nuevo usuario, asigna el rol por defecto y genera un token JWT.
   * @param createUserDto - Objeto que contiene los datos del nuevo usuario.
   * @returns - Objeto que contiene el token JWT generado.
   * @throws - HttpException si el usuario ya existe o si el rol no se encuentra.
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, curriculum, skills, expertise } = createUserDto;
  
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }
  
    // Hashea la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Busca el rol "User" en la base de datos
    const userRole = await this.roleRepository.findOne({ where: { name: 'User' } });
    if (!userRole) {
      throw new HttpException('Rol "User" no encontrado', HttpStatus.BAD_REQUEST);
    }
  
    // Normaliza los campos
    const curriculumNormalized = normalizeText(curriculum);
    const skillsNormalized = normalizeText(skills);
    const expertiseNormalized = normalizeText(expertise);
  
    // Crea un nuevo usuario con el rol "User" y guarda en la base de datos
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      roleId: userRole.id, // Asigna el rol "User" por defecto
      curriculumNormalized,
      skillsNormalized,
      expertiseNormalized,
    });
  
    const savedUser = await this.userRepository.save(newUser);
    return savedUser; // Devuelve el usuario registrado
  }  
}
