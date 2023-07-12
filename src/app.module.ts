import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { RedisModule } from './common/redis/redis.module';
import { SysMenuModule } from './module/v1/system/menu/sysMenu.module';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './filter/exception.filter';
import { SysDeptModule } from './module/v1/system/dept/SysDept.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    RedisModule,
    SysMenuModule,
    SysDeptModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule {}
