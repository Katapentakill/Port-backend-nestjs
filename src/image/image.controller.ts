import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * TODO
   * ? Maneja la carga de imágenes.
   * Utiliza FileInterceptor para procesar archivos enviados en la solicitud.
   * @param file - El archivo cargado.
   * @param res - La respuesta HTTP.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response): Promise<void> {
    try {
      console.log('Received request to upload image');
      console.log('File received:', file); // Log del archivo recibido

      const result = await this.imageService.uploadImage(file);
      res.status(HttpStatus.OK).json({ url: result.secure_url, publicId: result.public_id });
    } catch (error) {
      console.error('Error occurred during image upload:', error); // Log del error detallado
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message }); // Responder con error
    }
  }
}
