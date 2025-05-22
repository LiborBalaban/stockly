import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePositionDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  storageId?: number;
}
