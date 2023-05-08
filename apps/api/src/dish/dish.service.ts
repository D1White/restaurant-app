import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getRedisKey } from 'utils/constants';
import { RedisService } from 'utils/redis.service';

import { CreateDishDto } from './dto/create-dish.dto';
import { DishFilter } from './dto/dish-params.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish, DishDocument } from './schemas/dish.schema';

const EXPIRE_TIME = 3 * 60 * 60;
const REDIS_BASE_KEY = 'dish';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) public dishModel: Model<DishDocument>,
    private readonly redisService: RedisService,
  ) {}

  async findAll(filter: DishFilter) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, filter?.category);
    const cachedData = await this.redisService.getJSON<DishDocument[]>(redisKey);

    if (cachedData) return cachedData;

    let dishes = await this.dishModel.find().populate('category').exec();

    if (filter?.category) {
      dishes = dishes.filter((dish) => dish.category.slug === filter.category);
    }

    await this.redisService.setJSON(redisKey, dishes, EXPIRE_TIME);

    return dishes;
  }

  async findOne(id: string) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, id);
    const cachedData = await this.redisService.getJSON<DishDocument>(redisKey);

    if (cachedData) return cachedData;

    const dish = await this.dishModel.findById(id).populate('category').exec();

    await this.redisService.setJSON(redisKey, dish, EXPIRE_TIME);

    return dish;
  }

  async create(createDishDto: CreateDishDto) {
    await this.redisService.del(REDIS_BASE_KEY);

    const dish = new this.dishModel(createDishDto);
    return dish.save();
  }

  async update(id: string, updateDishDto: UpdateDishDto) {
    await this.redisService.delAll(REDIS_BASE_KEY);

    return this.dishModel.findByIdAndUpdate(id, updateDishDto, { new: true }).exec();
  }

  async remove(id: string) {
    await this.redisService.delAll(REDIS_BASE_KEY);

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
