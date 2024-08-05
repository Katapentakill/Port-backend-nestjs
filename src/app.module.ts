import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user';
import { Role } from './entities/role';
import { Tag } from './entities/tag';
import { Status } from './entities/status';
import { Task } from './entities/task';
import { RoleSeeder } from './database/seeders/role.seeder';
import { StatusSeeder } from './database/seeders/status.seeder';
import { TagSeeder } from './database/seeders/tag.seeder';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TaskSimilarityModule } from './recommend/task-similarity.module';
import { StatusModule } from './status/status.module';
import { TagModule } from './tag/tag.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { UserSeeder } from './database/seeders/user.seeder';
import { TaskSeeder } from './database/seeders/task.seeder';
import { UserSeeder2 } from './database/seeders/user2.seeder';
import { AdminSeeder } from './database/seeders/admin.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Role, Tag, Status, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Role, Tag, Status, Task]),
    AuthModule,
    TaskSimilarityModule,
    TaskModule,
    UserModule,
    StatusModule,
    TagModule,
    RoleModule,
    ImageModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RoleSeeder,
    StatusSeeder,
    TagSeeder,
    UserSeeder,
    TaskSeeder,
    UserSeeder2,
    AdminSeeder,
  ],
})
export class AppModule {}
