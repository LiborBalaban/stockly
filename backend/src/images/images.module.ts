import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
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
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
})
export class ImagesModule {}
