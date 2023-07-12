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
import { SysUserService } from './SysUser.service';
import { SysUserQueryDto } from './dto/SysUserQueryDto';
import { SysUserEntity } from './SysUser.entity';

@Controller('/v1/sys/user')
export class SysUserController {
  constructor(private readonly sysUserService: SysUserService) {}

  @Get('getUserList')
  getUserList(@Query() sysUser: SysUserQueryDto) {
    return this.sysUserService.getUserList(sysUser);
  }

  @Post('addUser')
  addUser(@Body() sysUser: SysUserEntity) {
    return this.sysUserService.addUser(sysUser);
  }

  @Put('updateUser')
  updateUser(@Body() sysUser: SysUserEntity) {
    return this.sysUserService.updateUser(sysUser);
  }

  @Delete('delUser:id')
  delUser(@Param() id: number) {
    return this.sysUserService.delUser(id);
  }
}
