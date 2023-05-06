import { IsMongoId, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { MIN_PRICE } from 'utils/constants';

export class CreateDishDto {
  @MinLength(2)
  name: string;

  @IsOptional()
  @MinLength(5)
  description: string;

  @IsNumber()
  @Min(MIN_PRICE)
  price: number;

  @IsString()
  weight: string;

  @IsOptional()
  @IsUrl()
  photo: string;

  @IsMongoId()
  category: string;
}
