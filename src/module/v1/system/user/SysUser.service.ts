import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUserEntity } from './SysUser.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/respone/response';
import { PaginateHelper } from 'src/core/help/PaginateHelper';
import { SysUserQueryDto } from './dto/SysUserQueryDto';

@Injectable()
export class SysUserService {
  constructor(
    @InjectRepository(SysUserEntity)
    private readonly userRepository: Repository<SysUserEntity>,
  ) {}

  async getUserList(sysUser: SysUserQueryDto) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('u')
      .where(sysUser);

    const result = await PaginateHelper.paginate<SysUserEntity>(
      queryBuilder,
      sysUser.current,
      sysUser.pageSize,
    );
    return ApiResponse.success(result);
  }

  async addUser(sysUser: SysUserEntity) {
    const result = await this.userRepository.save<SysUserEntity>(sysUser);
    return ApiResponse.success(result);
  }

  async updateUser(sysUser: SysUserEntity) {
    const result = await this.userRepository.update(sysUser.id, sysUser);
    return result.affected == 1
      ? ApiResponse.successToMessage('修改成功')
      : ApiResponse.failToMessage('修改失败');
  }

  async delUser(id: number) {
    const result = await this.userRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
