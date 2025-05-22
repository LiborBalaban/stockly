import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(5)
    description: string;
  
    @IsString()
    phone: string;
}
