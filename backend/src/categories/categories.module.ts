import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';
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
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
