import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis(
      this.configService.get<Record<string, PropertyKey>>('redis'),
    );
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }
}
