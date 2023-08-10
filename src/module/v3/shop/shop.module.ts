import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopEntitys } from './shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntitys])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
