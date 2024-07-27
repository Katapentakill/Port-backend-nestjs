// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ImageModule } from 'src/image/image.module';  // Importa el módulo de la imagen
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ImageModule,  // Asegúrate de importar el módulo de la imagen aquí
  ],
  providers: [UserService,ImageService],
  controllers: [UserController],
})
export class UserModule {}
