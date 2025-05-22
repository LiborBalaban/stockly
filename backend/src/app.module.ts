import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CompanyModule } from './company/company.module';
import { PositionsModule } from './positions/positions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { ImagesModule } from './images/images.module';
import { MovementsModule } from './movements/movements.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ExpectedDeliveryModule } from './expected-delivery/expected-delivery.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [CategoriesModule, AuthModule, SuppliersModule, CompanyModule, PositionsModule, WarehousesModule, ProductsModule, RolesModule, ImagesModule, MovementsModule, UsersModule, PrismaModule, ExpectedDeliveryModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
