import { Module } from '@nestjs/common';
import { SysMenuController } from './SysMenu.controller';
import { SysMenuService } from './SysMenu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysMenuEntity } from './SysMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysMenuEntity])],
  controllers: [SysMenuController],
  providers: [SysMenuService],
})
export class SysMenuModule {}
