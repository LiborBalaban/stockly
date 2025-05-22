import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { JwtModule } from '@nestjs/jwt'; 
import { WarehouseRepository } from './warehouses.repository';

@Module({
  imports: [
          JwtModule.register({
            secret: process.env.TOKEN,
            signOptions: {
              expiresIn: '1h',
            },
          }),
        ],
  controllers: [WarehousesController],
  providers: [WarehousesService, WarehouseRepository],
})
export class WarehousesModule {}
