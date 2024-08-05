import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../entities/user';
import { Role } from '../../entities/role';
import * as bcrypt from 'bcrypt';
import { normalizeText } from '../../utils/normalizeText';  // Asegúrate de importar la función de normalización correcta

@Injectable()
export class AdminSeeder {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const userRepository = this.connection.getRepository(User);
      const roleRepository = this.connection.getRepository(Role);

      // Buscar el rol Admin
      const adminRole = await roleRepository.findOne({ where: { name: 'Admin' } });

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      // Datos de ejemplo para el usuario admin
      const adminData = {
        email: 'admin@example.com',
        name: 'Admin',
        lastname: 'User',
        job: 'Administrator',
        curriculum: 'Administrador con amplia experiencia en la gestión de sistemas y proyectos. Experto en liderazgo de equipos y optimización de procesos.',
        skills: 'Gestión de Proyectos, Liderazgo de Equipos, Optimización de Procesos, Estrategia Empresarial',
        expertise: 'Experiencia en administración de sistemas, gestión de equipos de trabajo, y optimización de procesos empresariales.',
        password: 'AdminPassword123!', // Contraseña en texto plano para ser encriptada
        image: 'https://example.com/admin-image.jpg',
        roleId: adminRole.id,
      };

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      // Crear el usuario admin con la contraseña encriptada y datos normalizados
      const admin = userRepository.create({
        ...adminData,
        password: hashedPassword,
        curriculumNormalized: this.normalizeText(adminData.curriculum),
        skillsNormalized: this.normalizeText(adminData.skills),
        expertiseNormalized: this.normalizeText(adminData.expertise),
      });

      await userRepository.save(admin);
      this.logger.log(`Seeded admin user: ${admin.name} ${admin.lastname} with email: ${admin.email}`);
    } catch (error) {
      this.logger.error(`Failed to seed admin user: ${error.message}`, error.stack);
    }
  }

  // Método para normalizar el texto usando la función de utils
  private normalizeText(text: string): string {
    // Aquí debes importar la función de normalización y usarla
    return normalizeText(text);
  }
}
