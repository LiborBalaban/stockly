import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PositionRepository } from './positions.repository';
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
  controllers: [PositionsController],
  providers: [PositionsService, PositionRepository],
})
export class PositionsModule {}
