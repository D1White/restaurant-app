import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DishService } from 'dish/dish.service';
import { Model } from 'mongoose';
import { getRedisKey } from 'utils/constants';
import { RedisService } from 'utils/redis.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

const EXPIRE_TIME = 1 * 60 * 60;
const REDIS_BASE_KEY = 'order';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) public orderModel: Model<OrderDocument>,
    private readonly dishService: DishService,
    private readonly redisService: RedisService,
  ) {}

  async findAll(userId: string) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, userId);
    const cachedData = await this.redisService.getJSON<OrderDocument[]>(redisKey);

    if (cachedData) return cachedData;

    const orders = await this.orderModel.find({ user: userId }).exec();

    await this.redisService.setJSON(redisKey, orders, EXPIRE_TIME);

    return orders;
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).populate('order_list').exec();
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, userId);
    await this.redisService.del(redisKey);

    const dishesPrice = await this.dishService.getPriceByIds(createOrderDto.order_list);

    const order = new this.orderModel({ ...createOrderDto, price: dishesPrice || 0, user: userId });
    return order.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId: string) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, userId);
    await this.redisService.del(redisKey);

    const dishesPrice = updateOrderDto?.order_list
      ? await this.dishService.getPriceByIds(updateOrderDto.order_list)
      : null;

    return this.orderModel
      .findByIdAndUpdate(
        id,
        { ...updateOrderDto, ...(dishesPrice && { price: dishesPrice }) },
        { new: true },
      )
      .exec();
  }
}
