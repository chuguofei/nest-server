import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shopping_shop')
export class ShopBaseDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shop_name' })
  shopName: string;
}
