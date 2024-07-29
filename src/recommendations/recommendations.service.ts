import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class RecommendationsService {
    private pythonScriptPath = 'D:\\Escritorio\\ProyectosAleEstudio\\IA\\ExtractData\\recomendador_ia\\main.py';
    private venvPath = 'D:\\Escritorio\\ProyectosAleEstudio\\IA\\ExtractData\\recomendador_ia\\env\\Scripts\\activate';

    async generateDescription(taskName: string, taskDescription: string): Promise<any[]> {
        if (!taskName || !taskDescription) {
            throw new Error('Task name and description must be provided.');
        }

        try {
            // Comando para activar el entorno virtual y luego ejecutar el script
            const command = `cmd /c "${this.venvPath} && set PYTHONIOENCODING=utf-8 && python "${this.pythonScriptPath}" "${taskName}" "${taskDescription}"`;

            const { stdout, stderr } = await execPromise(command);

            if (stderr) {
                console.error(`Error: ${stderr}`);
                throw new Error(stderr);
            }

            console.log(`Command output: ${stdout}`);
            return this.parseOutput(stdout);
        } catch (error) {
            console.error('Error generating description:', error);
            throw error;
        }
    }

    private parseOutput(output: string): any[] {
        // Implementación de parseo de salida
        const lines = output.split('\n');
        const results = [];
        let currentUser = null;
        let currentDescription = '';

        for (const line of lines) {
            if (line.startsWith('Usuario recomendado:')) {
                if (currentUser) {
                    results.push({ ...currentUser, description: currentDescription });
                }
                const [userName, prob] = line.replace('Usuario recomendado: ', '').split(' con una probabilidad de ');
                currentUser = { name: userName.trim(), probability: parseFloat(prob) / 100 };
                currentDescription = '';
            } else if (line.startsWith('Nombre del usuario recomendado:')) {
                // Se puede ignorar esta línea
            } else if (line.startsWith('Descripción natural:')) {
                currentDescription = line.replace('Descripción natural:', '').trim();
            } else {
                currentDescription += `${line.trim()}`;
            }
        }

        if (currentUser) {
            results.push({ ...currentUser, description: currentDescription });
        }

        return results;
    }
}
