import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateEmployeeDto} from './dto/create-employee';
import { TokenPayloadDto } from './dto/token.dto';
import { LoginDto } from './dto/login-auth.dto';
import { EmailService } from './email.service';
import { CompanyService } from 'src/company/company.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly companyService: CompanyService,
  ) {}

  async register(dto: CreateAuthDto) {
    const existingUser = await this.authRepo.findUserByEmail(dto.email);
    
    if (existingUser){
      throw new ConflictException('Uživatel s tímto e-mailem již existuje.');
    }

    const company = await this.companyService.create({
      name:dto.company_name
    })
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationToken = this.generateVerificationCode();
  
    const savedUser = await this.authRepo.createUser({
    email: dto.email,
    name: dto.name,
    password: hashedPassword,
    role: { connect: { id: 3 } }, 
    token: verificationToken,
     company: { connect: { id: company?.company.id } },
    });

  
  
    const activateAddress = `http://localhost:3000/activate/${verificationToken}`;
  
    await this.emailService.sendEmail(
      savedUser.email,
      'Ověření účtu',
      `<p>Klikněte zde pro ověření účtu: <a href="${activateAddress}">${activateAddress}</a></p>`
    );
  
    return { message: 'Ověřovací e-mail byl odeslán.' };
  }

   async registerEmployee(dto: CreateEmployeeDto) {
    const { url_token, userPassword, userName } = dto;
    
    const token = this.generateVerificationCode();

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const secret = process.env.TOKEN || 'default_value';
    const decodedToken = jwt.verify(url_token, secret) as TokenPayloadDto;
    const email = decodedToken.email;
    const companyId = decodedToken.company;
    const role = decodedToken.role;
    let storageId = 0;

    if (decodedToken.storage) {
      storageId = decodedToken.storage;
    }
    const verificationToken = this.generateVerificationCode();
  
    const savedUser = await this.authRepo.createUser({
    name: userName,
          password: hashedPassword,
          email: email,
          token: token,
          role:{connect:{id:role}},
          company:{connect:{id:companyId}},
          storage:{connect:{id:storageId}}
    });


    const activateAddress = `http://localhost:3000/activate/${verificationToken}`;
  
    await this.emailService.sendEmail(
      savedUser.email,
      'Ověření účtu',
      `<p>Klikněte zde pro ověření účtu: <a href="${activateAddress}">${activateAddress}</a></p>`
    );
  
    return { message: 'Ověřovací e-mail byl odeslán.' };
  }


  async verifyAccount(token: string) {
    const user = await this.authRepo.findUserByToken(token);
    if (!user) throw new NotFoundException('Neplatný nebo vypršelý ověřovací odkaz.');
  
    if (user.isActive) {
      return { message: 'Účet je již aktivní.' };
    }
  
    await this.authRepo.updateUser(user.id, {
      isActive: true,
      token : null
    });
  
    return { message: 'Účet byl úspěšně ověřen.' };
  }


  async login(loginDto: LoginDto) {
    const user = await this.authRepo.findUserByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Neplatné přihlašovací údaje.');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Neplatné přihlašovací údaje.');

    const token = this.generateToken(user.id, user.email, user.roleId, user.companyId, user.name, user.storageId ?? 0);
    
    return { token };
  }

  findAll(role:number, name:string) {
    return {
      documents: {
            message: "You are authenticated",
            role:role,
            name:name
        }
    };
  }

  findOne(id: number) {
    return this.authRepo.findUserById(id);
  }

  private generateToken(userId: number, email: string, roleId: number, companyId:number, name:string, storageId:number): string {
    return this.jwtService.sign({
      sub: userId,
      email,
      roleId,
      companyId,
      name,
      storageId
    });
  }

  private generateVerificationCode(): string {
    return crypto.randomBytes(3).toString('hex'); // Generuje 6 znakový hex kód
  }
}
