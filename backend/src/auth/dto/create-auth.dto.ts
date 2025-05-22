import {IsString,IsEmail,IsBoolean,IsOptional,IsInt,IsPositive,MinLength} from 'class-validator';
export class CreateAuthDto {
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;
  
    @IsString()
    company_name: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @IsString()
    token: string;
  
    @IsInt()
    @IsPositive()
    roleId: number;
  
    @IsInt()
    @IsPositive()
    companyId: number;
  
    @IsInt()
    @IsOptional()
    @IsPositive()
    storageId?: number;
}
