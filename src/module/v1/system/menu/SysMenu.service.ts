import { Injectable } from '@nestjs/common';
import { SysMenuEntity } from './SysMenu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SysMenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly menuRepository: Repository<SysMenuEntity>,
  ) {}

  getMenuList() {
    return this.menuRepository.query('select * from sys_menu');
  }
}
