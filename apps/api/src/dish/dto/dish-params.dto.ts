import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

class DishParams {
  @IsString()
  category: string;
}

export class DishFilter extends PartialType(DishParams) {}
