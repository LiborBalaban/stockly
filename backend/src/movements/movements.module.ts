import { Module } from '@nestjs/common';
import { MovementService } from './movements.service';
import { MovementsController } from './movements.controller';
import { MovementRepository } from './movements.repository';
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
  controllers: [MovementsController],
  providers: [MovementService, MovementRepository],
})
export class MovementsModule {}
