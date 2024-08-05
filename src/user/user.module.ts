// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ImageModule } from 'src/image/image.module';
import { ImageService } from 'src/image/image.service';
import { Role } from 'src/entities/role';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    ImageModule,
  ],
  providers: [UserService,ImageService],
  controllers: [UserController],
})
export class UserModule {}
