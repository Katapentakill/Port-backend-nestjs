import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config'; // Importar la configuración de Cloudinary

@Injectable()
export class ImageService {
  /**
   * Sube una imagen a Cloudinary.
   * @param file - El archivo a subir.
   * @returns - La respuesta de Cloudinary con detalles de la imagen.
   */
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      // Subir el archivo a Cloudinary directamente desde el buffer
      const result: UploadApiResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'user-images' }, // Carpeta en Cloudinary donde se almacenará la imagen
          (error, result) => {
            if (error) {
              console.error('Error uploading image:', error); // Log del error detallado
              return reject(error); // Rechazar la promesa en caso de error
            }
            resolve(result); // Resolver la promesa con el resultado de la subida
          }
        ).end(file.buffer); // Subir el buffer al stream
      });

      console.log('Upload result:', result); // Log del resultado de la subida
      return result; // Retornar el resultado de la subida
    } catch (error) {
      console.error('Error occurred during image upload:', error); // Log del error general
      throw new Error('Error uploading image'); // Lanzar error en caso de excepción
    }
  }

  /**
   * Elimina una imagen de Cloudinary.
   * @param publicId - El identificador público de la imagen en Cloudinary.
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId); // Eliminar la imagen de Cloudinary
    } catch (error) {
      console.error('Error deleting image:', error); // Log del error detallado
      throw new Error('Error deleting image'); // Lanzar error en caso de excepción
    }
  }
}
