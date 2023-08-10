import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ClassifyModule } from './classify/classify.module';
import { GoodsModule } from './goods/goods.module';
import { GoodsTagsModule } from './goods_tags/GoodsTags.module';

@Module({
  imports: [ShopModule, ClassifyModule, GoodsModule, GoodsTagsModule],
})
export class ShoppingModule {}
