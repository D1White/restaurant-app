import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DishService } from 'dish/dish.service';
import { Model } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) public orderModel: Model<OrderDocument>,
    private readonly dishService: DishService,
  ) {}

  async findAll(userId: string) {
    return this.orderModel.find({ user: userId }).exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).populate('order_list').exec();
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const dishesPrice = await this.dishService.getPriceByIds(createOrderDto.order_list);

    const order = new this.orderModel({ ...createOrderDto, price: dishesPrice || 0, user: userId });
    return order.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
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
