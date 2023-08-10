import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GoodsListDto } from './goods.list.entity';
import { GoodsTags } from '../../goods_tags/GoodsTags.entity';

@Entity('shopping_goods_tags')
export class GoodsTagsDto extends GoodsTags {
  @ManyToOne(() => GoodsListDto, (goods) => goods.goodsTagsDto)
  @JoinColumn({ name: 'goods_id' })
  goods: GoodsListDto;
}
