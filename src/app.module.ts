import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './filter/exception.filter';
import { ShoppingModule } from './module/v3/shopping';
import { SystemModule } from './module/v1/system';
import { CommonModule } from './common';

@Module({
  imports: [CommonModule, SystemModule, ShoppingModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule {}
