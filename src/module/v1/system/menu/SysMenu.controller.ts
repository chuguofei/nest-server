import { Controller, Get } from '@nestjs/common';
import { SysMenuService } from './SysMenu.service';
import { LoggerService } from 'src/common/logger/logger.service';

@Controller('/v1/sysMenu')
export class SysMenuController {
  constructor(
    private readonly menuService: SysMenuService,
    private readonly logger: LoggerService,
  ) {}

  @Get('/getMenuList')
  getMenuList() {
    this.logger.info('====');
    return this.menuService.getMenuList();
  }
}
