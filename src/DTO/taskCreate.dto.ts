import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  requiredSkills?: string;

  @IsOptional()
  @IsString()
  requiredExpertise?: string;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsDateString()
  @IsNotEmpty()
  creationDate: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}
