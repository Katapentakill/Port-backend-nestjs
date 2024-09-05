import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../entities/user';
import { Role } from '../../entities/role';
import * as bcrypt from 'bcrypt';
import { normalizeText } from 'src/utils/normalizeText';

@Injectable()
export class UserSeeder2 {
  private readonly logger = new Logger(UserSeeder2.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const userRepository = this.connection.getRepository(User);
      const roleRepository = this.connection.getRepository(Role);

      // Buscar los roles
      const adminRole = await roleRepository.findOne({ where: { name: 'Admin' } });
      const userRole = await roleRepository.findOne({ where: { name: 'User' } });

      if (!adminRole || !userRole) {
        throw new Error('Roles not found');
      }

      // Datos de ejemplo de usuarios
      const users = [
        {
          email: 'emma.johnson@example.com',
          name: 'Emma',
          lastname: 'Johnson',
          job: 'Backend Developer',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Desarrolladora Backend con más de 6 años de experiencia en la creación de sistemas robustos y escalables. Experta en la programación con Node.js y Python, con un enfoque en la creación de APIs eficientes y seguras. Ha trabajado en la optimización de bases de datos tanto SQL como NoSQL, liderando la arquitectura de microservicios en entornos distribuidos. Además, tiene experiencia en la resolución de problemas complejos de rendimiento y la integración de soluciones con servicios en la nube.',
          skills: 'Desarrollo Backend, manejo experto en Node.js y Python, creación y optimización de bases de datos SQL y NoSQL, diseño de arquitecturas de microservicios, integración de servicios en la nube, soluciones a problemas de escalabilidad y rendimiento.',
          expertise: 'Emma es experta en la construcción de sistemas backend robustos, diseñando arquitecturas distribuidas con microservicios que garantizan escalabilidad y eficiencia. Domina técnicas de optimización de bases de datos y es capaz de integrar sistemas complejos a la nube para mejorar el rendimiento y la seguridad de las aplicaciones web.',
        },
        
        {
          email: 'oliver.williams@example.com',
          name: 'Oliver',
          lastname: 'Williams',
          job: 'UX/UI Designer',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Diseñador UX/UI con 5 años de experiencia en la creación de interfaces de usuario que combinan funcionalidad con un diseño estético atractivo. Tiene un dominio completo de herramientas de diseño como Adobe XD, Figma y Sketch, y una gran habilidad para transformar requerimientos de usuario en prototipos interactivos. Ha trabajado en proyectos donde ha dirigido investigaciones de usuario, pruebas de usabilidad, y optimización de interfaces.',
          skills: 'Diseño de interfaces de usuario intuitivas, experiencia avanzada en Adobe XD, Figma y Sketch, creación de prototipos interactivos, investigación de usuarios, pruebas de usabilidad, diseño centrado en el usuario.',
          expertise: 'Oliver es experto en diseñar experiencias de usuario que equilibren la usabilidad con una estética moderna. Tiene la capacidad de liderar equipos multidisciplinarios, analizar feedback de usuarios, y realizar mejoras continuas que resulten en interfaces más eficientes y atractivas.',
        },
        
        {
          email: 'ava.martinez@example.com',
          name: 'Ava',
          lastname: 'Martinez',
          job: 'Data Scientist',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Científica de Datos con más de 7 años de experiencia en el análisis de datos y la creación de modelos predictivos avanzados. Tiene un conocimiento profundo de herramientas como Python y R, y utiliza técnicas de Machine Learning para resolver problemas complejos de análisis de grandes volúmenes de datos. Su experiencia incluye la creación de dashboards interactivos, informes detallados que apoyan decisiones estratégicas, y la integración de datos provenientes de diferentes fuentes para generar insights útiles.',
          skills: 'Ciencia de Datos, análisis predictivo avanzado, Python, R, técnicas de Machine Learning, creación de dashboards interactivos, análisis y visualización de grandes volúmenes de datos, integración de múltiples fuentes de datos.',
          expertise: 'Ava es experta en transformar datos en valor estratégico mediante el uso de técnicas avanzadas de análisis y Machine Learning. Tiene la capacidad de interpretar grandes cantidades de datos, generar informes que orienten decisiones empresariales, y crear modelos predictivos que mejoran la eficiencia operativa y competitividad de las empresas.',
        },
        
        {
          email: 'liam.brown@example.com',
          name: 'Liam',
          lastname: 'Brown',
          job: 'DevOps Engineer',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Ingeniero DevOps con más de 5 años de experiencia en la automatización y optimización de los procesos de desarrollo y operaciones. Tiene amplios conocimientos en CI/CD, AWS, y Azure, gestionando infraestructuras en la nube y pipelines de despliegue. Ha trabajado en la implementación de sistemas de integración continua que mejoran el ciclo de vida del software y aseguran un rendimiento óptimo de los sistemas distribuidos.',
          skills: 'DevOps, automatización de procesos, integración continua (CI/CD), gestión de infraestructuras en la nube con AWS y Azure, optimización de pipelines de despliegue, administración de sistemas distribuidos.',
          expertise: 'Liam es experto en implementar prácticas de DevOps que mejoran el flujo de trabajo entre desarrollo y operaciones, con un enfoque en la automatización y optimización del ciclo de vida del software. Su experiencia en el uso de AWS y Azure le permite gestionar infraestructuras complejas y garantizar que los despliegues se realicen de forma eficiente y segura.',
        },
        
        {
          email: 'mia.jones@example.com',
          name: 'Mia',
          lastname: 'Jones',
          job: 'Mobile App Developer',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Desarrolladora de Aplicaciones Móviles con más de 4 años de experiencia en el diseño y desarrollo de aplicaciones nativas y multiplataforma para iOS y Android. Tiene un conocimiento profundo en el uso de frameworks como React Native y Flutter, lo que le permite crear aplicaciones eficientes y con interfaces atractivas. Su enfoque está en la experiencia del usuario, asegurando que las aplicaciones sean fáciles de usar y visualmente impactantes.',
          skills: 'Desarrollo de aplicaciones móviles nativas y multiplataforma, experiencia avanzada en React Native y Flutter, diseño de interfaces para iOS y Android, enfoque en experiencia de usuario (UX/UI), optimización de aplicaciones para dispositivos móviles.',
          expertise: 'Mia es experta en el desarrollo de aplicaciones móviles que combinan rendimiento y diseño. Tiene la capacidad de diseñar interfaces de usuario intuitivas, asegurando que cada aplicación se ejecute de manera fluida en dispositivos iOS y Android. Además, su conocimiento en frameworks modernos le permite crear aplicaciones innovadoras que responden a las necesidades del mercado móvil.',
        },
        
        {
          email: 'noah.smith@example.com',
          name: 'Noah',
          lastname: 'Smith',
          job: 'Security Analyst',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Analista de Seguridad con más de 6 años de experiencia en la identificación y mitigación de amenazas a la seguridad de sistemas. Ha trabajado en la implementación de medidas de seguridad para proteger redes y sistemas críticos, realizando auditorías de seguridad, análisis de vulnerabilidades, y pruebas de penetración. Es un experto en la creación de soluciones que garantizan la integridad de la infraestructura tecnológica y la protección de datos sensibles.',
          skills: 'Seguridad de la información, análisis de vulnerabilidades, auditorías de seguridad, pruebas de penetración, implementación de medidas de seguridad, protección de datos críticos y sistemas.',
          expertise: 'Noah es experto en garantizar la seguridad de sistemas y redes mediante la identificación de amenazas y la implementación de soluciones preventivas. Su experiencia en auditorías y pruebas de penetración le permite detectar y corregir vulnerabilidades, asegurando que las infraestructuras tecnológicas estén bien protegidas contra ataques cibernéticos.',
        },
        
        {
          email: 'ava.garcia@example.com',
          name: 'Ava',
          lastname: 'Garcia',
          job: 'Project Manager',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Gerente de Proyectos con más de 8 años de experiencia en la planificación, ejecución y seguimiento de proyectos complejos en diversas industrias. Es experta en metodologías ágiles como Scrum y Kanban, y ha liderado equipos multidisciplinarios para la entrega exitosa de proyectos. Su enfoque está en la gestión eficiente del tiempo, presupuesto y riesgos, asegurando que los objetivos de cada proyecto se cumplan de manera efectiva y dentro del cronograma.',
          skills: 'Gestión de proyectos, metodologías ágiles (Scrum, Kanban), planificación estratégica, gestión de riesgos y presupuesto, liderazgo de equipos multidisciplinarios, seguimiento y control de proyectos.',
          expertise: 'Ava es experta en dirigir proyectos desde su fase inicial hasta la entrega, asegurando que los resultados sean eficientes y cumplan con las expectativas del cliente. Su habilidad para gestionar múltiples variables, como el tiempo, presupuesto, y los recursos humanos, garantiza la finalización exitosa de proyectos complejos dentro de plazos ajustados.',
        },
        
        {
          email: 'liam.lee@example.com',
          name: 'Liam',
          lastname: 'Lee',
          job: 'Systems Analyst',
          password: 'security1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          curriculum: 'Analista de Sistemas con más de 5 años de experiencia en el diseño y análisis de soluciones tecnológicas para empresas. Ha trabajado en la recopilación de requisitos, elaboración de especificaciones técnicas y la identificación de soluciones que mejoren la eficiencia operativa. Su experiencia incluye colaborar con equipos de desarrollo para asegurar que las soluciones técnicas se alineen con los objetivos del negocio y mejoren la productividad general.',
          skills: 'Análisis de sistemas, recolección de requisitos, diseño de soluciones tecnológicas, elaboración de especificaciones técnicas, mejora de la eficiencia operativa, colaboración con equipos de desarrollo.',
          expertise: 'Liam es experto en analizar sistemas y desarrollar soluciones tecnológicas que satisfacen las necesidades empresariales. Tiene una capacidad probada para identificar mejoras en procesos tecnológicos, diseñar soluciones eficientes, y trabajar estrechamente con equipos técnicos para garantizar que las implementaciones sean exitosas y alineadas con los objetivos del negocio.',
        },
      ];
      

      for (const userData of users) {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Crear el usuario con la contraseña encriptada y datos normalizados
        const user = userRepository.create({
          ...userData,
          password: hashedPassword,
          curriculumNormalized: normalizeText(userData.curriculum),
          skillsNormalized: normalizeText(userData.skills),
          expertiseNormalized: normalizeText(userData.expertise),
        });

        await userRepository.save(user);
        this.logger.log(`Seeded user: ${user.name} ${user.lastname} with email: ${user.email}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed users: ${error.message}`, error.stack);
    }
  }
}