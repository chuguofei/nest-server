import { AppEntity } from 'src/common/entitys/base.entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopping_goods')
export class GoodsEntitys extends AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'goods_code' })
  goodsCode: string;

  @Column({ name: 'goods_name' })
  goodsName: string;

  @Column({ type: 'decimal', name: 'goods_discount_price' })
  goodsDiscountPrice: number;

  @Column({ type: 'decimal', name: 'goods_price' })
  goodsPrice: number;

  @Column({ name: 'goods_details', comment: '键值对' })
  goodsDetails: string;

  @Column({ name: 'goods_fitment', comment: '装修数据' })
  goodsFitment: string;

  @Column({ name: 'goods_brand', comment: '商品品牌' })
  goodsBrand: string;

  @Column({ name: 'goods_pictures' })
  goodsPictures: string;

  @Column({ name: 'goods_sales_count', comment: '销量' })
  goodsSaleCount: number;

  @Column({ name: 'goods_scope' })
  goodsScope: string;

  @Column({ name: 'goods_inventory', comment: '库存' })
  goodsInventory: number;

  @Column({
    name: 'is_recommend',
    type: 'bit',
    transformer: {
      // 转为数据库的值
      to(value) {
        return value == 1 ? Buffer.from([1]) : Buffer.from([0]);
      },
      // 转为实体类的值
      from(value) {
        return value[0];
      },
    },
  })
  isRecommend: boolean;

  @Column({ name: 'goods_tags', comment: '商品标签' })
  goodsTags: string;

  @Column({ name: 'goods_classify_id' })
  goodsClassifyId: number;

  @Column({ name: 'goods_shop_id' })
  goodsShopId: number;
}
