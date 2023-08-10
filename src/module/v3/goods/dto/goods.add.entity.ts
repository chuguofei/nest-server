import { GoodsEntitys } from '../goods.entity';
import { GoodsTagsDto } from './goods.tags.entity';

export class GoodsAddDto extends GoodsEntitys {
  goodsTagsDto: GoodsTagsDto[];
}
