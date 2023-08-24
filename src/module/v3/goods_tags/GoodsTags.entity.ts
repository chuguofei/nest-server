import { AppEntity } from 'src/common/entitys/base.entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopping_goods_tags')
export class GoodsTags extends AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'goods_id' })
  goodsId: number;

  @Column({ name: 'key' })
  key: string;

  @Column({ name: 'value' })
  value: string;
}
