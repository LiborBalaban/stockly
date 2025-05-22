import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ExpectedDeliveryItemDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) 
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) 
  price: number;
}