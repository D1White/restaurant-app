import { ArrayNotEmpty, IsArray, IsEnum, IsMongoId, IsOptional, MinLength } from 'class-validator';

import { OrderStatusEnum, PaymenTypeEnum } from '../types';

export class CreateOrderDto {
  @MinLength(5)
  address: string;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @IsEnum(PaymenTypeEnum)
  payment_type: PaymenTypeEnum;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  order_list: string[];
}
