import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DishService } from 'dish/dish.service';
import { Model } from 'mongoose';
import { RedisService } from 'utils/redis.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

const EXPIRE_TIME = 3 * 60 * 60;
const REDIS_BASE_KEY = 'category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) public categoryModel: Model<CategoryDocument>,
    private readonly dishService: DishService,
    private readonly redisService: RedisService,
  ) {}

  async findAll() {
    const cachedData = await this.redisService.getJSON<CategoryDocument[]>(REDIS_BASE_KEY);

    if (cachedData) return cachedData;

    const categories = await this.categoryModel.find().exec();

    await this.redisService.setJSON(REDIS_BASE_KEY, categories, EXPIRE_TIME);

    return categories;
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    await this.redisService.del(REDIS_BASE_KEY);

    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.redisService.del(REDIS_BASE_KEY);

    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    if (!category) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const dishesWithCurrentCategory = await this.dishService.findAll({ category: category.slug });

    if (dishesWithCurrentCategory.length > 0) {
      throw new HttpException('You have dishes with this category', HttpStatus.FORBIDDEN);
    }

    await this.redisService.del(REDIS_BASE_KEY);

    await this.categoryModel.findByIdAndDelete(id);
    return true;
  }
}
