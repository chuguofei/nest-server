import { AppEntity } from 'src/common/entitys/base.entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopping_shop')
export class ShopEntitys extends AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shop_name' })
  shopName: string;

  @Column({ name: 'shop_desc_scope' })
  shopDescScope: string;

  @Column({ name: 'shop_service_scope' })
  shopServiceScope: string;

  @Column({ name: 'shop_logistics_scope' })
  shopLogisticsScope: string;

  @Column({ name: 'shop_fitment' })
  shopFitment: string;

  @Column({ name: 'shop_avatar' })
  shopAvatar: string;
}
