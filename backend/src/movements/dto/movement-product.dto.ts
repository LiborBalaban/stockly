import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class MovementProductDto {
  @IsInt()
  @Type(() => Number) 
  id: number;

  @IsInt()
  @Type(() => Number) 
  quantity: number;

  @Type(() => Number) 
  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number) 
  positionId?: number;
}