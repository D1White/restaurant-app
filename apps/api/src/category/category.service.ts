import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DishService } from 'dish/dish.service';
import { Model } from 'mongoose';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) public categoryModel: Model<CategoryDocument>,
    private readonly dishService: DishService,
  ) {}

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
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

    await this.categoryModel.findByIdAndDelete(id);
    return true;
  }
}
