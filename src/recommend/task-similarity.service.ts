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
    const scriptPath = 'D:\\Ale\\Recomend System\\Machine-learning-Gestion-Tareas\\script3.py';
    const pythonExecutable = 'D:\\Pyt\\python.exe'; // Ruta al python.exe
    const command = `"${pythonExecutable}" "${scriptPath}" "${requiredSkillsNormalized}" "${requiredExpertiseNormalized}" "${descriptionNormalized}"`;

    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr) {
        console.error('Python script stderr:', stderr); // Verifica si hay errores en la ejecución del script
      }
      console.log('Python script stdout:', stdout); // Verifica la salida del script
      return JSON.parse(stdout); // Asegúrate de que stdout sea un JSON válido
    } catch (error) {
      console.error('Error executing Python script:', error.message);
      console.error('Stack trace:', error.stack);
      throw new Error('Error executing the Python script');
    }
  }  
}