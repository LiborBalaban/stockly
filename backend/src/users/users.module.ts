import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt'; 
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './users.repository';
import { EmailService } from 'src/auth/email.service';

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.TOKEN,
        signOptions: {
          expiresIn: '1h',
        },
      }),
      forwardRef(() => AuthModule)
    ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
