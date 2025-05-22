import { Module } from '@nestjs/common';
import { ExpectedDeliveryService } from './expected-delivery.service';
import { ExpectedDeliveryController } from './expected-delivery.controller';
import { ExpectedDeliveryRepository } from './exprected-delivery.repository';
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
  controllers: [ExpectedDeliveryController],
  providers: [ExpectedDeliveryService, ExpectedDeliveryRepository],
})
export class ExpectedDeliveryModule {}
