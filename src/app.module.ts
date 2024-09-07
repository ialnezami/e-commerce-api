import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [AuthModule, ProductsModule, CategoriesModule, OrdersModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
