import { IsInt, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class InventoryItemDto {
  @IsInt()
  @Type(() => Number)
  inventoryId: number;

  @IsInt()
  productId: number;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  realQuantity?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  expectedQty?: number;
}