import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { MIN_PRICE } from 'utils/constants';

import { OrderStatusEnum, PaymenTypeEnum } from '../types';

export class CreateOrderDto {
  @MinLength(5)
  address: string;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @IsNumber()
  @Min(MIN_PRICE)
  price: OrderStatusEnum;

  @IsEnum(PaymenTypeEnum)
  payment_type: PaymenTypeEnum;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  order_list: string;
}
