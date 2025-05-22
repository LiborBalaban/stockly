import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { JwtModule } from '@nestjs/jwt'; 

@Module({
   imports: [
      JwtModule.register({
        secret: process.env.TOKEN,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService],
})
export class CompanyModule {}
