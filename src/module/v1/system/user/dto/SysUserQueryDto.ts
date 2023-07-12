import { Entity } from 'typeorm';
import { SysUserEntity } from '../SysUser.entity';

@Entity()
export class SysUserQueryDto extends SysUserEntity {
  pageSize: number;
  current: number;
}
