import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysUserEntity } from './SysUser.entity';
import { SysUserController } from './SysUser.controller';
import { SysUserService } from './SysUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysUserEntity])],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
