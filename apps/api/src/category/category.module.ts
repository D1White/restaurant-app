import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishModule } from 'dish/dish.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    DishModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
