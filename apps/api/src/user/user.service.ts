import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(createUserDto.password, 7);
    const createdUser = new this.userModel({ ...createUserDto, password: hashPassword });
    return createdUser.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashPassword = updateUserDto?.password ? await hash(updateUserDto.password, 7) : '';

    return this.userModel
      .findByIdAndUpdate(
        id,
        { ...updateUserDto, ...(hashPassword && { password: hashPassword }) },
        { new: true },
      )
      .select('-password')
      .exec();
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return true;
  }
}
