import { AppEntity } from 'src/common/entitys/base.entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeTransformerDefault } from 'src/core/transformer/TimeTransformer';

@Entity('shopping_classify')
export class ClassifyEntitys extends AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'classify_name' })
  classifyName: string;

  @Column({ name: 'pid' })
  pid: number;

  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
    transformer: TimeTransformerDefault(),
  })
  createAt: Date;

  @Column({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
    transformer: TimeTransformerDefault(),
  })
  updateAt: Date;
}
