import { IsInt } from 'class-validator';

export class CreateStockDto {
  @IsInt()
  storageId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  typeMovement: number;
}