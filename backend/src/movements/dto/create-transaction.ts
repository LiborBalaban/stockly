import { IsInt, IsOptional } from 'class-validator';

export class CreateStockTransactionDto {
  @IsInt()
  movementId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;

  @IsInt()
  storageId: number;

  @IsOptional()
  @IsInt()
  positionId?: number;
}