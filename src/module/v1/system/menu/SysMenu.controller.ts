import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { SysMenuService } from './SysMenu.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { SysMenuEntity } from './SysMenu.entity';
import { SysMenuQueryDto } from './dto/SysMenuQueryDto';

@Controller('/v1/sys/menu')
export class SysMenuController {
  constructor(
    private readonly menuService: SysMenuService,
    private readonly logger: LoggerService,
  ) {}

  @Get('/getMenuList')
  getMenuList(@Query() sysMenu: SysMenuQueryDto) {
    return this.menuService.getMenuList(sysMenu);
  }

  @Post('/addMenu')
  addMenu(@Body() sysMenu: SysMenuEntity) {
    return this.menuService.addMenu(sysMenu);
  }

  @Put('/updateMenu')
  updateMenu(@Body() sysMenu: SysMenuEntity) {
    return this.menuService.updateMenu(sysMenu);
  }

  @Delete('/delMenu/:id')
  delMenu(@Param() id: number) {
    return this.menuService.delMenu(id);
  }
}
