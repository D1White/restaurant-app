import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { getRedisKey } from 'utils/constants';
import { RedisService } from 'utils/redis.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

const EXPIRE_TIME = 3 * 60 * 60;
const REDIS_BASE_KEY = 'user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(createUserDto.password, 7);
    const createdUser = new this.userModel({ ...createUserDto, password: hashPassword });
    return createdUser.save();
  }

  async findById(id: string) {
    const redisKey = getRedisKey(REDIS_BASE_KEY, id);
    const cachedData = await this.redisService.getJSON<UserDocument>(redisKey);

    if (cachedData) return cachedData;

    const user = await this.userModel.findById(id).select('-password').exec();

    await this.redisService.setJSON(redisKey, user, EXPIRE_TIME);

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashPassword = updateUserDto?.password ? await hash(updateUserDto.password, 7) : '';

    const redisKey = getRedisKey(REDIS_BASE_KEY, id);
    await this.redisService.del(redisKey);

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
    const redisKey = getRedisKey(REDIS_BASE_KEY, id);
    await this.redisService.del(redisKey);

    await this.userModel.findByIdAndDelete(id);
    return true;
  }
}
