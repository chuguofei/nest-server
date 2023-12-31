import { BaseEntity, Column, Entity } from 'typeorm';
import { TimeTransformerDefault } from 'src/core/transformer/TimeTransformer';

export class AppEntity extends BaseEntity {
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
