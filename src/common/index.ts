import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule, UploadModule],
})
export class CommonModule {}
