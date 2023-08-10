import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { GoodsEntitys } from '../goods.entity';
import { ShopEntitys } from '../../shop/shop.entity';
import { ClassifyEntitys } from '../../classify/classify.entity';
import { GoodsTagsDto } from './goods.tags.entity';

@Entity('shopping_goods')
export class GoodsListDto extends GoodsEntitys {
  @OneToOne(() => ShopEntitys, (shop) => shop.id)
  @JoinColumn({ name: 'goods_shop_id' })
  shop: ShopEntitys;

  @OneToOne(() => ClassifyEntitys, (classify) => classify.id)
  @JoinColumn({ name: 'goods_classify_id' })
  classify: ClassifyEntitys;

  @OneToMany(() => GoodsTagsDto, (tag) => tag.goods)
  @JoinColumn({ name: 'id' })
  goodsTagsDto: GoodsTagsDto;
}
