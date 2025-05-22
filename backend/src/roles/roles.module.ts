import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './roles.repository';
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
            
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
})
export class RolesModule {}
