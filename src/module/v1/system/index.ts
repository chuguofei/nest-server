import { Module } from '@nestjs/common';
import { SysMenuModule } from './menu/SysMenu.module';
import { SysDeptModule } from './dept/SysDept.module';

@Module({
  imports: [SysMenuModule, SysDeptModule],
})
export class SystemModule {}
