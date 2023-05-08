import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishModule } from 'dish/dish.module';
import { RedisService } from 'utils/redis.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), DishModule],
  controllers: [OrderController],
  providers: [OrderService, RedisService],
})
export class OrderModule {}
