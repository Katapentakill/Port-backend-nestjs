import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Task } from '../../entities/task';
import { User } from '../../entities/user';
import { Status } from '../../entities/status';
import { Tag } from '../../entities/tag';
import { normalizeText } from '../../utils/normalizeText';

@Injectable()
export class TaskSeeder {
  private readonly logger = new Logger(TaskSeeder.name);

  constructor(private readonly connection: Connection) {}

  async run() {
    try {
      const taskRepository = this.connection.getRepository(Task);
      const userRepository = this.connection.getRepository(User);
      const statusRepository = this.connection.getRepository(Status);
      const tagRepository = this.connection.getRepository(Tag);

      // Obtén los estados
      const status1 = await statusRepository.findOne({ where: { id: 1 } });
      const status2 = await statusRepository.findOne({ where: { id: 2 } });
      const status3 = await statusRepository.findOne({ where: { id: 3 } });

      // Obtén etiquetas para asociarlas con las tareas
      const tags = await tagRepository.find();

      // Datos de ejemplo para las tareas
      const tasks = [
        {
          name: "Optimización de API de Gestión de Tareas",
          description: "Revisar y optimizar la API RESTful existente para la gestión de tareas en nuestra aplicación. El objetivo es garantizar que la API funcione con la máxima eficiencia y seguridad. Esto incluye la implementación de mejoras en el rendimiento, como la optimización de consultas a la base de datos, la reducción de tiempos de respuesta y la mejora de la escalabilidad. Además, realizar pruebas exhaustivas para identificar posibles cuellos de botella y asegurarse de que la API pueda manejar un aumento en la carga de trabajo sin degradar su rendimiento.",
          requiredSkills: "Node.js, Express, optimización de APIs, pruebas de rendimiento, seguridad, manejo de bases de datos SQL y NoSQL",
          requiredExpertise: "Experiencia en la optimización de APIs y pruebas de rendimiento. Habilidad para identificar y resolver problemas de escalabilidad y seguridad en sistemas backend.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          status: status1,
          statusId: status1.id
        },
        {
          name: "Diseño de Prototipos para Nueva Funcionalidad",
          description: "Desarrollar prototipos interactivos para una nueva funcionalidad en la aplicación utilizando herramientas de diseño como Adobe XD, Figma o Sketch. Este proceso incluye la creación de wireframes, la elaboración de diseños visuales y la interacción de usuario para la funcionalidad propuesta. También es necesario realizar pruebas de usabilidad con usuarios finales para obtener retroalimentación y ajustar el diseño en función de los resultados. El objetivo es asegurar que el diseño final sea intuitivo, funcional y estéticamente atractivo.",
          requiredSkills: "Adobe XD, Figma, Sketch, creación de prototipos interactivos, pruebas de usabilidad, diseño centrado en el usuario, análisis de feedback de usuarios",
          requiredExpertise: "Experiencia en diseño de interfaces y creación de prototipos interactivos. Capacidad para interpretar requerimientos de usuario y realizar mejoras basadas en pruebas de usabilidad.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: status3,
          statusId: status3.id
        },
        {
          name: "Desarrollo de Modelos Predictivos Avanzados",
          description: "Desarrollar modelos predictivos avanzados para analizar grandes volúmenes de datos utilizando técnicas de Machine Learning. Esto incluye la selección y entrenamiento de modelos adecuados, la validación de los resultados y la integración de estos modelos en dashboards interactivos. Los informes generados a partir de estos modelos deben proporcionar insights detallados que apoyen la toma de decisiones estratégicas. Se espera que el trabajo también incluya la integración de datos provenientes de diferentes fuentes para generar una visión más completa y precisa.",
          requiredSkills: "Machine Learning, Python, R, análisis predictivo, creación de dashboards, integración de datos, análisis y visualización de grandes volúmenes de datos",
          requiredExpertise: "Experiencia en Machine Learning y análisis de datos complejos. Habilidad para desarrollar modelos predictivos avanzados y generar informes útiles para la toma de decisiones empresariales.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          status: status2,
          statusId: status2.id
        },
        {
          name: "Automatización de Pipeline de CI/CD",
          description: "Diseñar e implementar una solución de integración continua y entrega continua (CI/CD) para automatizar el ciclo de vida del software. Esto incluye la configuración y gestión de pipelines de despliegue utilizando herramientas como Jenkins, GitLab CI o similares. El objetivo es optimizar el proceso de desarrollo y despliegue para garantizar que las nuevas versiones del software se integren de manera fluida y segura. Además, se requiere la automatización completa de pruebas, construcción y despliegue para mejorar la eficiencia y reducir el riesgo de errores en el software.",
          requiredSkills: "CI/CD, Jenkins, GitLab CI, automatización de procesos, AWS, Azure, gestión de infraestructura en la nube, optimización de pipelines",
          requiredExpertise: "Experiencia en la implementación de pipelines de CI/CD y gestión de infraestructuras en la nube. Habilidad para automatizar el ciclo de vida del software y optimizar el proceso de despliegue.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
          status: status3,
          statusId: status3.id
        },
        {
          name: "Desarrollo de Aplicación Móvil Multiplataforma",
          description: "Desarrollar una aplicación móvil multiplataforma utilizando frameworks modernos como React Native o Flutter. El objetivo es crear una aplicación que sea eficiente, con una interfaz atractiva y que ofrezca una experiencia de usuario fluida tanto en dispositivos iOS como en Android. Esto incluye el diseño de la interfaz de usuario, la implementación de funcionalidades clave y la optimización del rendimiento para garantizar que la aplicación funcione sin problemas en diferentes tipos de dispositivos y resoluciones de pantalla. También se deben realizar pruebas exhaustivas para asegurar la calidad y la usabilidad de la aplicación.",
          requiredSkills: "React Native, Flutter, desarrollo de aplicaciones móviles, diseño de interfaces para iOS y Android, optimización de rendimiento, pruebas de calidad",
          requiredExpertise: "Experiencia en desarrollo de aplicaciones móviles multiplataforma. Capacidad para crear interfaces intuitivas y optimizar el rendimiento de la aplicación en diferentes dispositivos.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          status: status1,
          statusId: status1.id
        },
        {
          name: "Auditoría de Seguridad de Sistema",
          description: "Realizar una auditoría completa de seguridad del sistema para identificar y mitigar posibles vulnerabilidades. Esto incluye la evaluación de la seguridad de la infraestructura tecnológica, la realización de pruebas de penetración, y la implementación de medidas de seguridad para proteger datos sensibles y garantizar la integridad del sistema. El objetivo es asegurar que todos los aspectos de la seguridad estén cubiertos y que las posibles amenazas sean identificadas y mitigadas de manera efectiva. Se deben generar informes detallados con recomendaciones para mejorar la seguridad general del sistema.",
          requiredSkills: "Auditoría de seguridad, análisis de vulnerabilidades, pruebas de penetración, protección de datos, implementación de medidas de seguridad, análisis de riesgos",
          requiredExpertise: "Experiencia en auditorías de seguridad y protección de sistemas. Habilidad para identificar vulnerabilidades y implementar soluciones efectivas para proteger la infraestructura tecnológica.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: status2,
          statusId: status2.id
        },
        {
          name: "Planificación Estratégica de Proyecto",
          description: "Liderar la planificación y ejecución de un proyecto complejo utilizando metodologías ágiles como Scrum o Kanban. Esto incluye la definición de objetivos, la planificación de sprints, la gestión del presupuesto y los riesgos, y la coordinación con los equipos multidisciplinarios para asegurar que todos los aspectos del proyecto estén alineados con las metas establecidas. Se requiere una gestión eficaz del tiempo y los recursos para garantizar la entrega exitosa del proyecto dentro del cronograma y presupuesto. También es necesario monitorear el progreso y realizar ajustes según sea necesario.",
          requiredSkills: "Gestión de proyectos, metodologías ágiles (Scrum, Kanban), planificación estratégica, gestión de riesgos, liderazgo de equipos, seguimiento de proyectos",
          requiredExpertise: "Experiencia en la gestión de proyectos complejos y en la aplicación de metodologías ágiles. Habilidad para liderar equipos y gestionar múltiples variables para asegurar el éxito del proyecto.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: status2,
          statusId: status2.id
        },
        {
          name: "Análisis de Requisitos para Nuevo Sistema",
          description: "Realizar un análisis detallado de los requisitos para el desarrollo de un nuevo sistema. Esto incluye la recopilación y documentación de requisitos, la elaboración de especificaciones técnicas y la identificación de soluciones que mejoren la eficiencia operativa. Se requiere colaborar estrechamente con los equipos de desarrollo para asegurar que las soluciones propuestas se alineen con los objetivos del negocio y satisfagan las necesidades del cliente. Además, se debe asegurar que la documentación esté completa y sea precisa para facilitar la implementación del sistema.",
          requiredSkills: "Análisis de sistemas, recolección de requisitos, diseño de soluciones tecnológicas, elaboración de especificaciones técnicas, colaboración con equipos de desarrollo",
          requiredExpertise: "Experiencia en análisis de sistemas y diseño de soluciones tecnológicas. Habilidad para colaborar con equipos de desarrollo y garantizar que las soluciones sean efectivas y alineadas con los objetivos del negocio.",
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: status2,
          statusId: status2.id
        }
      ];      

      for (const taskData of tasks) {
        // Crear la tarea con los datos normalizados
        const task = taskRepository.create({
          ...taskData,
          requiredSkillsNormalized: normalizeText(taskData.requiredSkills),
          requiredExpertiseNormalized: normalizeText(taskData.requiredExpertise),
          descriptionNormalized: normalizeText(taskData.description),
        });

        await taskRepository.save(task);
        this.logger.log(`Seeded task: ${task.name} with description: ${task.description}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed tasks: ${error.message}`, error.stack);
    }
  }
}