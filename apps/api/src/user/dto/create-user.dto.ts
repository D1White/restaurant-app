import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @MinLength(2)
  name: string;

  @IsPhoneNumber('UA')
  phone: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  orders: string;
}
