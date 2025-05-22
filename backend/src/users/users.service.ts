import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { EmailService } from 'src/auth/email.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository,
              private readonly emailService: EmailService
  ) {}
  async create(dto: CreateUserDto, companyId:number) {
    try {
      const secret = process.env.TOKEN || 'default_value';
      const employee_token = jwt.sign({role: dto.role, email:dto.email, company: companyId , storage:dto.storage}, secret, {expiresIn:'24h'});
    
      const link = `http://localhost:3000/sing-up-employee/${employee_token}`;

      await this.emailService.sendEmail(
      dto.email,
      'Registrace do firmy',
      `<p>Klikněte zde: <a href="${link}">${link}</a> a zaregistrujte se</p>`
    );
  
    return { message: 'Ověřovací e-mail byl odeslán.' };
       
        } catch (error) {
          console.error('Chyba při vytváření  uživatele:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při vytváření uživatele.',
          );
        }
  }

  async findAll(companyId:number) {
     try {
      const users = await this.repo.findAllByCompany(companyId);

    if(users){
      return {
        documents:users,
        message:"Uživatelé byly získáni správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání uživatelů:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání uživatelů.',
      );
    }
  }

  async findAllByStorage(storageId:number) {
     try {
      const users = await this.repo.findAllByStorage(storageId);

    if(users){
      return {
        documents:users,
        message:"Uživatelé byly získáni správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání uživatelů:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání uživatelů.',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.repo.findOne(id);

    if(user){
      return {
        documents:user,
        message:"Uživatel byl získán správně"
      }
    }
    } catch (error) {
      console.error('Chyba při hledání uživatele:', error);
        throw new InternalServerErrorException(
        'Bohužel došlo k chybě při hledání uživatele.',
      );
    }
  }
}
