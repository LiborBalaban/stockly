import { IsString, IsOptional, IsInt, IsDate, IsPositive } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  positionId?: number;

  @IsInt()
  @IsPositive()
  companyId: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}