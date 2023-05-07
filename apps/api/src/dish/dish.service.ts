import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDishDto } from './dto/create-dish.dto';
import { DishFilter } from './dto/dish-params.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish, DishDocument } from './schemas/dish.schema';

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) public dishModel: Model<DishDocument>) {}

  async findAll(filter: DishFilter) {
    const dishes = await this.dishModel.find().populate('category').exec();

    if (filter?.category) {
      return dishes.filter((dish) => dish.category.slug === filter.category);
    }

    return dishes;
  }

  async findOne(id: string) {
    return this.dishModel.findById(id).populate('category').exec();
  }

  async create(createDishDto: CreateDishDto) {
    const dish = new this.dishModel(createDishDto);
    return dish.save();
  }

  async update(id: string, updateDishDto: UpdateDishDto) {
    return this.dishModel.findByIdAndUpdate(id, updateDishDto, { new: true }).exec();
  }

  async remove(id: string) {
    await this.dishModel.findByIdAndDelete(id);
    return true;
  }

  async getPriceByIds(ids: string[]) {
    const dishes = await this.dishModel
      .find({ _id: { $in: ids } })
      .select('price')
      .exec();

    const price = dishes.reduce((curr, acc) => curr + acc.price, 0);

    return price;
  }
}
