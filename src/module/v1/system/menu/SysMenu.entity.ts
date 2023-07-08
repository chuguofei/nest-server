import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_menu')
export class SysMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pid: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  component: string;

  @Column()
  hidden: number;

  @Column()
  frameUrl: string;
}
