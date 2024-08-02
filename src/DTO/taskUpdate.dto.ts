import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class TaskUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  requiredSkills?: string;

  @IsOptional()
  @IsString()
  requiredExpertise?: string;

  @IsOptional()
  @IsNumber()
  statusId?: number;

  @IsOptional()
  @IsDateString()
  creationDate?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
