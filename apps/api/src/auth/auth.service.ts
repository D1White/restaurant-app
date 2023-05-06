import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { SecureUser, UserDocument } from 'user/schemas/user.schema';
import { UserService } from 'user/user.service';

import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<SecureUser> {
    const user = await this.userService.findByEmail(email);

    const match = await compare(pass, user.password);

    if (user && match) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const userData = await this.userService.create(dto);

    return {
      token: this.jwtService.sign({ id: userData._id } as JwtPayload),
    };
  }

  async login(user: UserDocument) {
    return {
      token: this.jwtService.sign({ id: user._id } as JwtPayload),
    };
  }
}
