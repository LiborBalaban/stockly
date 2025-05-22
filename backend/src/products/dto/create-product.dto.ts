import {IsString,IsInt,IsOptional,MaxLength,} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number) 
  categoryId?: number;

  @IsOptional()
  @IsInt()
  positionId?: number;
}
