import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Task } from '../../entities/task';
import { User } from '../../entities/user';
import { Status } from '../../entities/status';
import { Tag } from '../../entities/tag';

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

      // Obtén usuarios por email
      const johnDoe = await userRepository.findOne({ where: { email: 'john.doe@example.com' } });
      const janeDoe = await userRepository.findOne({ where: { email: 'jane.doe@example.com' } });
      const michaelJohnson = await userRepository.findOne({ where: { email: 'michael.johnson@example.com' } });
      const emilyClark = await userRepository.findOne({ where: { email: 'emily.clark@example.com' } });
      const danielWilliams = await userRepository.findOne({ where: { email: 'daniel.williams@example.com' } });
      const sophiaLopez = await userRepository.findOne({ where: { email: 'sophia.lopez@example.com' } });
      const jamesBrown = await userRepository.findOne({ where: { email: 'james.brown@example.com' } });
      const oliviaMartin = await userRepository.findOne({ where: { email: 'olivia.martin@example.com' } });
      const liamMiller = await userRepository.findOne({ where: { email: 'liam.miller@example.com' } });
      const miaDavis = await userRepository.findOne({ where: { email: 'mia.davis@example.com' } });

      // Obtén los tres estados
      const status1 = await statusRepository.findOne({ where: { id: 1 } });
      const status2 = await statusRepository.findOne({ where: { id: 2 } });
      const status3 = await statusRepository.findOne({ where: { id: 3 } });

      // Obtén etiquetas para asociarlas con las tareas
      const tags = await tagRepository.find();

      // Datos de ejemplo para las tareas
      const tasks = [
        {
          name: 'Desarrollo de API RESTful',
          description: 'Crear una API RESTful para la gestión de usuarios.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
          user: johnDoe,
          status: status1,
          tags: tags.slice(0, 2),
        },
        {
          name: 'Diseño de interfaz de usuario',
          description: 'Diseñar la interfaz de usuario para la nueva aplicación móvil.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
          user: janeDoe,
          status: status2,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Estrategia de marketing digital',
          description: 'Desarrollar una estrategia de marketing digital para el nuevo producto.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
          user: michaelJohnson,
          status: status3,
          tags: tags.slice(2, 4),
        },
        {
          name: 'Planificación de proyecto',
          description: 'Planificar el nuevo proyecto de implementación de ERP.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 21)).toISOString(),
          user: emilyClark,
          status: status1,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Análisis de datos de ventas',
          description: 'Analizar los datos de ventas del último trimestre.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
          user: danielWilliams,
          status: status2,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Desarrollo de frontend',
          description: 'Desarrollar el frontend de la aplicación web utilizando React.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
          user: sophiaLopez,
          status: status3,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Implementación de CI/CD',
          description: 'Implementar un pipeline de CI/CD utilizando Jenkins.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString(),
          user: jamesBrown,
          status: status1,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Programa de bienestar de empleados',
          description: 'Desarrollar un programa de bienestar para los empleados.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
          user: oliviaMartin,
          status: status2,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Automatización de pruebas',
          description: 'Automatizar las pruebas para la nueva aplicación utilizando Selenium.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(),
          user: liamMiller,
          status: status3,
          tags: tags.slice(1, 3),
        },
        {
          name: 'Requisitos empresariales',
          description: 'Recopilar y analizar los requisitos empresariales para el nuevo sistema.',
          creationDate: new Date().toISOString(),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 11)).toISOString(),
          user: miaDavis,
          status: status1,
          tags: tags.slice(1, 3),
        },
      ];

      for (const taskData of tasks) {
        const task = taskRepository.create(taskData);
        await taskRepository.save(task);
        this.logger.log(`Seeded task: ${task.name} with description: ${task.description}`);
      }
    } catch (error) {
      this.logger.error(`Failed to seed tasks: ${error.message}`, error.stack);
    }
  }
}
