import { IsEmail, IsOptional, IsString, IsInt } from 'class-validator';
export class CreateCompanyDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsInt()
    psc?: number;
  
    @IsOptional()
    @IsString()
    city?: string;
}
