import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class TaskSimilarityService {
  /**
   * Calcula la similitud entre las descripciones de habilidades, experiencia y tarea.
   * Ejecuta un script de Python para realizar el cálculo de similitud.
   * @param requiredSkillsNormalized - Habilidades requeridas normalizadas.
   * @param requiredExpertiseNormalized - Experiencia requerida normalizada.
   * @param descriptionNormalized - Descripción normalizada de la tarea.
   * @returns Una promesa que resuelve con el resultado del script de Python.
   * @throws Error si ocurre un problema al ejecutar el script de Python.
   */
  async getSimilarity(requiredSkillsNormalized: string, requiredExpertiseNormalized: string, descriptionNormalized: string): Promise<any> {
    const scriptPath = 'D:\\Escritorio\\ProyectosAleEstudio\\Machine learning\\script3.py';
    const command = `python "${scriptPath}" "${requiredSkillsNormalized}" "${requiredExpertiseNormalized}" "${descriptionNormalized}"`;
    try {
      const { stdout } = await execPromise(command);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error('Error executing the Python script');
    }
  }
}
