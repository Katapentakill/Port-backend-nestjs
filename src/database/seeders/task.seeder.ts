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
          name: 'Implementación de sistema de autenticación',
          requiredSkillsNormalized: "",
          requiredExpertiseNormalized: "",
          descriptionNormalized: "",
          description: 'Desarrollar e integrar un sistema de autenticación seguro utilizando JWT y OAuth2. Esto incluye la creación de rutas protegidas, manejo de tokens de acceso y refresco, y la implementación de un mecanismo de autorización basado en roles y permisos. Además, se debe garantizar que el sistema cumpla con los estándares de seguridad actuales y realizar pruebas exhaustivas para detectar posibles vulnerabilidades.',
          requiredSkills: 'Node.js, JWT, OAuth2, Seguridad Web, Pruebas Unitarias',
          requiredExpertise: 'Desarrollo Backend, Seguridad Informática',
          tags: [tags[0], tags[1]],
          user: await userRepository.findOne({ where: { id: 1 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Fecha de vencimiento en una semana
          status: status1,
          statusId: status1.id
        },
        {
          name: 'Desarrollo de dashboard de análisis de datos',
          requiredSkillsNormalized: "",
          requiredExpertiseNormalized: "",
          descriptionNormalized: "",
          description: 'Crear un dashboard interactivo para visualizar y analizar grandes volúmenes de datos. El dashboard debe permitir a los usuarios filtrar, ordenar y explorar los datos de diversas maneras, incluyendo gráficos dinámicos y reportes personalizados. Se debe utilizar una librería de visualización como D3.js o Chart.js, y asegurarse de que la interfaz sea intuitiva y responsiva para una experiencia de usuario óptima en múltiples dispositivos.',
          requiredSkills: 'JavaScript, D3.js, Chart.js, UX/UI, Visualización de Datos',
          requiredExpertise: 'Desarrollo Frontend, Análisis de Datos',
          tags: [tags[2], tags[3]],
          user: await userRepository.findOne({ where: { id: 2 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Fecha de vencimiento en dos semanas
          status: status2,
          statusId: status2.id
        },
        {
          name: 'Optimización de base de datos',
          requiredSkillsNormalized: "",
          requiredExpertiseNormalized: "",
          descriptionNormalized: "",
          description: 'Realizar una auditoría completa de la base de datos existente para identificar cuellos de botella y posibles mejoras en el rendimiento. Esto incluye la optimización de consultas, índices y estructuras de tablas, así como la implementación de estrategias de particionamiento y caché. Se debe documentar todos los cambios realizados y los resultados obtenidos, y proporcionar recomendaciones para el mantenimiento continuo y la escalabilidad futura de la base de datos.',
          requiredSkills: 'SQL, Optimización de Consultas, Indexación, Particionamiento, Caché',
          requiredExpertise: 'Administración de Bases de Datos, Optimización de Rendimiento',
          tags: [tags[4], tags[5]],
          user: await userRepository.findOne({ where: { id: 3 } }),
          creationDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // Fecha de vencimiento en tres semanas
          status: status3,
          statusId: status3.id
        }
      ];

      for (const taskData of tasks) {
        taskData.requiredSkillsNormalized = normalizeText(taskData.requiredSkills);
        taskData.requiredExpertiseNormalized = normalizeText(taskData.requiredExpertise);
        taskData.descriptionNormalized = normalizeText(taskData.description);

        const task = taskRepository.create(taskData);
        await taskRepository.save(task);
        this.logger.log(`Seeded task: ${task.name} with description: ${task.description}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed tasks: ${error.message}`, error.stack);
    }
  }
}
