import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { StoreModule } from './store/store.module';
import { DeliveryModule } from './delivery/delivery.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.URL_MONGODB, {
      dbName: process.env.DB_NAME,
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    RedisModule,
    CartModule,
    PaymentsModule,
    StoreModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
