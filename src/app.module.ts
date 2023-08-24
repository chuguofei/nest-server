import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './filter/exception.filter';
import { ShoppingModule } from './module/v3/shopping';
import { SystemModule } from './module/v1/system';
import { CommonModule } from './common';
import { V2Module } from './module/v2';

@Module({
  imports: [CommonModule, SystemModule, ShoppingModule, V2Module],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule {}
