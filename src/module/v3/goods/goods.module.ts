import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { GoodsEntitys } from './goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsListDto } from './dto/goods.list.entity';
import { ShopBaseDto } from '../shop/dto/shop.base.entity';
import { GoodsTagsDto } from './dto/goods.tags.entity';
import { GoodsTagsModule } from '../goods_tags/GoodsTags.module';
import { GoodsTags } from '../goods_tags/GoodsTags.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodsEntitys,
      GoodsListDto,
      ShopBaseDto,
      GoodsTagsDto,
      GoodsTags,
    ]),
    GoodsTagsModule,
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
