import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MovementProductDto } from './movement-product.dto';

class StockDetailsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number) 
  supplierId?: number;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsInt()
  @Type(() => Number) 
  invoiceNumber: number;

  @IsInt()
  @Type(() => Number) 
  storageId: number;
}

export class CreateMovementDto {
  @ValidateNested()
  @Type(() => StockDetailsDto)
  stockDetails: StockDetailsDto;

  @IsInt()
  @Type(() => Number) 
  typeMovement: number;

  @IsInt()
  @Type(() => Number) 
  expectedDelivery?: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MovementProductDto)
  products: MovementProductDto[];
}