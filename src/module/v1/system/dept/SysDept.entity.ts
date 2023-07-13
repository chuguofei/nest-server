import { BaseEntity } from 'src/common/entitys/base.entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeTransformerDefault } from 'src/core/transformer/TimeTransformer';

@Entity('sys_dept')
export class SysDeptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dept_name' })
  deptName: string;

  @Column()
  pid: number;

  @Column()
  remark: string;

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
