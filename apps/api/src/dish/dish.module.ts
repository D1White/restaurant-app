import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisService } from 'utils/redis.service';

import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { Dish, DishSchema } from './schemas/dish.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }])],
  controllers: [DishController],
  providers: [DishService, RedisService],
  exports: [DishService],
})
export class DishModule {}
