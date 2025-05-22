import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
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
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}
