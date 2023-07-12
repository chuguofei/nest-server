import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user')
export class SysUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  gender: number;

  avatar: string;

  email: string;

  phone: string;

  password: string;

  @Column({ name: 'dept_id' })
  deptId: string;

  status: number;

  remark: string;

  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  createAt: Date;

  @Column({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Date;
}
