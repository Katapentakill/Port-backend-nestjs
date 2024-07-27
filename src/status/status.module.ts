import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from 'src/entities/status';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusService],
  controllers: [StatusController]
})
export class StatusModule {}
