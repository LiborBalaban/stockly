import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  
@IsInt()
@Type(() => Number) 
  storageId: number;

  @IsString()
  name: string;
}