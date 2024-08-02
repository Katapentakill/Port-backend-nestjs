// task-similarity.service.ts
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class TaskSimilarityService {
  async getSimilarity(requiredSkillsNormalized: string, requiredExpertiseNormalized: string, descriptionNormalized: string): Promise<any> {
    const scriptPath = 'D:\\Escritorio\\ProyectosAleEstudio\\Machine learning\\script.py';
    // Asegúrate de escapar correctamente las comillas en el comando
    const command = `python "${scriptPath}" "${requiredSkillsNormalized}" "${requiredExpertiseNormalized}" "${descriptionNormalized}"`;
    try {
      const { stdout } = await execPromise(command);
      return JSON.parse(stdout);
    } catch (error) {
      throw new Error('Error executing the Python script');
    }
  }
}
