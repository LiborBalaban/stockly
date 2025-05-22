import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';
export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @IsOptional()
  productId?: number;
}
