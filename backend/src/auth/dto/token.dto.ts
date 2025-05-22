import { IsEmail, IsNumber, IsOptional } from 'class-validator';

export class TokenPayloadDto {
  @IsEmail()
  email: string;

  @IsNumber()
  company: number;

  @IsNumber()
  role: number;

  @IsOptional()
  @IsNumber()
  storage?: number;
}