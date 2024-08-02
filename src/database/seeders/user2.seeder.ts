import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../../entities/user';
import { Role } from '../../entities/role';

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
          email: 'john.doe@example.com',
          name: 'John',
          lastname: 'Doe',
          job: 'Backend Developer',
          curriculum: 'Desarrollador Backend con más de 5 años de experiencia en el desarrollo de aplicaciones escalables y mantenibles. Experiencia en la construcción de APIs RESTful, integración con bases de datos, y optimización de rendimiento. Competente en el uso de tecnologías como Node.js, Express, y SQL.',
          curriculumNormalized: 'desarrollador backend años experiencia desarrollo aplicaciones escalables mantenibles construccion apis restful integracion bases datos optimizacion rendimiento competente tecnologias nodejs express sql',
          password: 'securepassword123',
          image: 'https://example.com/image1.jpg',
          roleId: userRole.id,
          skills: 'Desarrollo Backend, APIs RESTful, Node.js, Express, SQL, Optimización de rendimiento',
          skillsNormalized: 'desarrollo backend apis restful nodejs express sql optimizacion rendimiento',
          expertise: 'Experto en la creación de APIs eficientes y escalables. Capacidad para diseñar e implementar soluciones backend robustas. Experiencia en la integración de servicios y la optimización de procesos de desarrollo.',
          expertiseNormalized: 'experto creacion apis eficientes escalables capacidad diseñar implementar soluciones backend robustas experiencia integracion servicios optimizacion procesos desarrollo',
        },
        {
          email: 'jane.doe@example.com',
          name: 'Jane',
          lastname: 'Doe',
          job: 'UI/UX Designer',
          curriculum: 'Diseñadora UI/UX con más de 6 años de experiencia en la creación de interfaces de usuario intuitivas y estéticamente agradables. Experiencia en el uso de herramientas de diseño como Figma, Adobe XD, y Sketch. Habilidad para realizar investigaciones de usuarios y aplicar principios de diseño centrados en el usuario.',
          curriculumNormalized: 'diseñadora ui ux años experiencia creacion interfaces usuario intuitivas esteticamente agradables experiencia herramientas diseno figma adobe xd sketch habilidad realizar investigaciones usuarios principios diseno centrados usuario',
          password: 'anothersecurepassword',
          image: 'https://example.com/image2.jpg',
          roleId: userRole.id,
          skills: 'Diseño de Interfaces, Figma, Adobe XD, Sketch, Investigación de Usuarios',
          skillsNormalized: 'diseno interfaces figma adobe xd sketch investigacion usuarios',
          expertise: 'Experta en la creación de interfaces visuales efectivas y atractivas. Experiencia en la investigación de necesidades de usuarios y aplicación de principios de diseño. Capacidad para colaborar estrechamente con equipos de desarrollo para lograr una experiencia de usuario coherente.',
          expertiseNormalized: 'experta creacion interfaces visuales efectivas atractivas experiencia investigacion necesidades usuarios aplicacion principios diseno capacidad colaborar estrechamente equipos desarrollo experiencia usuario coherente',
        },
        {
          email: 'michael.johnson@example.com',
          name: 'Michael',
          lastname: 'Johnson',
          job: 'Marketing Specialist',
          curriculum: 'Especialista en Marketing con 7 años de experiencia en la planificación y ejecución de campañas de marketing digital. Experto en el análisis de datos de mercado, creación de estrategias de contenido y gestión de campañas publicitarias. Conocimiento avanzado de herramientas de SEO y SEM.',
          curriculumNormalized: 'especialista marketing años experiencia planificacion ejecucion campañas marketing digital experto analisis datos mercado creacion estrategias contenido gestion campañas publicitarias conocimiento avanzado herramientas seo sem',
          password: 'yetanothersecurepassword',
          image: 'https://example.com/image3.jpg',
          roleId: userRole.id,
          skills: 'Marketing Digital, Análisis de Datos, Estrategias de Contenido, SEO, SEM',
          skillsNormalized: 'marketing digital analisis datos estrategias contenido seo sem',
          expertise: 'Experto en el desarrollo e implementación de estrategias de marketing digital. Capacidad para analizar datos del mercado y ajustar campañas para maximizar el impacto. Experiencia en la gestión de campañas publicitarias y optimización de contenido para SEO y SEM.',
          expertiseNormalized: 'experto desarrollo implementacion estrategias marketing digital capacidad analizar datos mercado ajustar campañas maximizar impacto experiencia gestion campañas publicitarias optimizacion contenido seo sem',
        },
        {
          email: 'emily.clark@example.com',
          name: 'Emily',
          lastname: 'Clark',
          job: 'Project Manager',
          curriculum: 'Gestora de Proyectos con más de 8 años de experiencia liderando equipos multidisciplinarios en la entrega de proyectos complejos. Experta en la planificación, ejecución y seguimiento de proyectos, asegurando la entrega a tiempo y dentro del presupuesto. Competente en el uso de metodologías ágiles como Scrum y Kanban.',
          curriculumNormalized: 'gestora proyectos años experiencia liderando equipos multidisciplinarios entrega proyectos complejos experta planificacion ejecucion seguimiento proyectos asegurando entrega tiempo dentro presupuesto competente metodologias agiles scrum kanban',
          password: 'strongpassword',
          image: 'https://example.com/image4.jpg',
          roleId: userRole.id,
          skills: 'Gestión de Proyectos, Scrum, Kanban, Planificación, Ejecución',
          skillsNormalized: 'gestion proyectos scrum kanban planificacion ejecucion',
          expertise: 'Experta en la gestión de proyectos complejos, asegurando la entrega puntual y eficiente. Experiencia en la implementación de metodologías ágiles para mejorar la productividad del equipo. Habilidad para coordinar múltiples partes interesadas y manejar riesgos.',
          expertiseNormalized: 'experta gestion proyectos complejos asegurando entrega puntual eficiente experiencia implementacion metodologias agiles mejorar productividad equipo habilidad coordinar multiples partes interesadas manejar riesgos',
        },
        {
          email: 'daniel.williams@example.com',
          name: 'Daniel',
          lastname: 'Williams',
          job: 'Data Analyst',
          curriculum: 'Analista de Datos con 5 años de experiencia en el análisis e interpretación de datos para apoyar la toma de decisiones empresariales. Experto en el uso de herramientas de análisis de datos como Python, R y SQL. Habilidad para construir modelos predictivos y realizar análisis estadísticos detallados.',
          curriculumNormalized: 'analista datos años experiencia analisis interpretacion datos apoyar toma decisiones empresariales experto herramientas analisis datos python r sql habilidad construir modelos predictivos realizar analisis estadisticos detallados',
          password: 'securepassword789',
          image: 'https://example.com/image5.jpg',
          roleId: userRole.id,
          skills: 'Análisis de Datos, Python, R, SQL, Modelos Predictivos',
          skillsNormalized: 'analisis datos python r sql modelos predictivos',
          expertise: 'Experto en la interpretación y análisis de grandes volúmenes de datos para generar información útil para la toma de decisiones. Experiencia en la construcción de modelos predictivos y análisis estadístico avanzado. Capacidad para comunicar hallazgos de manera clara y efectiva.',
          expertiseNormalized: 'experto interpretacion analisis grandes volumenes datos generar informacion util toma decisiones experiencia construccion modelos predictivos analisis estadistico avanzado capacidad comunicar hallazgos manera clara efectiva',
        },
        {
          email: 'sophia.lopez@example.com',
          name: 'Sophia',
          lastname: 'Lopez',
          job: 'Frontend Developer',
          curriculum: 'Desarrolladora Frontend con más de 4 años de experiencia en la creación de aplicaciones web interactivas. Experta en tecnologías frontend como React, Angular y Vue.js. Habilidad para colaborar con diseñadores y desarrolladores backend para construir interfaces de usuario funcionales y atractivas.',
          curriculumNormalized: 'desarrolladora frontend años experiencia creacion aplicaciones web interactivas experta tecnologias frontend react angular vuejs habilidad colaborar diseñadores desarrolladores backend construir interfaces usuario funcionales atractivas',
          password: 'password1234',
          image: 'https://example.com/image6.jpg',
          roleId: userRole.id,
          skills: 'Desarrollo Frontend, React, Angular, Vue.js, Interfaz de Usuario',
          skillsNormalized: 'desarrollo frontend react angular vuejs interfaz usuario',
          expertise: 'Experta en la creación de interfaces de usuario ricas y funcionales utilizando tecnologías frontend modernas. Capacidad para trabajar en estrecha colaboración con equipos de diseño y backend. Experiencia en la implementación de soluciones eficientes y optimizadas.',
          expertiseNormalized: 'experta creacion interfaces usuario ricas funcionales utilizando tecnologias frontend modernas capacidad trabajar estrecha colaboracion equipos diseno backend experiencia implementacion soluciones eficientes optimizadas',
        },
      ];

      for (const userData of users) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        this.logger.log(`Seeded user: ${user.name} ${user.lastname} with email: ${user.email}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed users: ${error.message}`, error.stack);
    }
  }
}
