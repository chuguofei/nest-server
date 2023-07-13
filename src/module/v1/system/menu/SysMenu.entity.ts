import { TimeTransformerDefault } from 'src/core/transformer/TimeTransformer';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('sys_menu')
export class SysMenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pid: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  sort: number;

  @Column()
  component: string;

  @Column({
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
  hidden: boolean;

  @Column()
  type: number;

  @Column({ name: 'frame_url' })
  frameUrl: string;

  @Column({
    type: 'bit',
    transformer: {
      to(value) {
        return value ? Buffer.from([1]) : Buffer.from([0]);
      },
      from(value) {
        return (value && value[0] == 1) || null;
      },
    },
  })
  layout: boolean;

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
