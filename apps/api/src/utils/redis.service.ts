import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Redis, { RedisKey, RedisValue } from 'ioredis';

import { getRedisKey } from './constants';

@Injectable()
export class RedisService {
  redis = new Redis(process.env.REDIS_URI);

  async set(key: RedisKey, value: RedisValue, expireTime: number) {
    try {
      await this.redis.set(key, value, 'EX', expireTime);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async setJSON(key: RedisKey, value: unknown, expireTime: number) {
    const jsonValue = JSON.stringify(value);
    await this.set(key, jsonValue, expireTime);
  }

  async get(key: RedisKey) {
    try {
      return await this.redis.get(key);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getJSON<T>(key: RedisKey): Promise<T> {
    const value = await this.get(key);
    return JSON.parse(value);
  }

  async keys(pattern: string) {
    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async del(...args: [...keys: RedisKey[]]) {
    try {
      return await this.redis.del(...args);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delByPattern(pattern: string) {
    try {
      const keys = await this.keys(pattern);
      await this.del(...keys);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delAll(key: string) {
    try {
      const pattern = getRedisKey(key, '*');
      const keys = await this.keys(pattern);
      await this.del(key, ...keys);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
