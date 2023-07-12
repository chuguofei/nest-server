import { Entity } from 'typeorm';
import { SysMenuEntity } from '../SysMenu.entity';

@Entity()
export class SysMenuQueryDto extends SysMenuEntity {
  pageSize: number;
  current: number;
}
