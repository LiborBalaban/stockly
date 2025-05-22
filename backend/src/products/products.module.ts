import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
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
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
