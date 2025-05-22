import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SupplierRepository } from './suppliers.repository';
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
  controllers: [SuppliersController],
  providers: [SuppliersService, SupplierRepository],
})
export class SuppliersModule {}
