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
import { ExpectedDeliveryItemDto } from './expected-delivery-item.dto';

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

  @IsInt()
  @Type(() => Number) 
  userId: number;
}

export class CreateExpectedDeliveryDto {
  @ValidateNested()
  @Type(() => StockDetailsDto)
  stockDetails: StockDetailsDto;

  @IsInt()
  @Type(() => Number) 
  typeMovement: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExpectedDeliveryItemDto)
  products: ExpectedDeliveryItemDto[];
}
