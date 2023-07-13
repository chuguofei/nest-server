import { Injectable } from '@nestjs/common';
import { SysMenuEntity } from './SysMenu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/common/logger/logger.service';
import { paginate } from 'nestjs-typeorm-paginate';
import { SysMenuQueryDto } from './dto/SysMenuQueryDto';
import { PaginateHelper } from 'src/core/help/PaginateHelper';
import { ApiResponse } from 'src/core/respone/response';

@Injectable()
export class SysMenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly menuRepository: Repository<SysMenuEntity>,
    private readonly logger: LoggerService,
  ) {}

  async getMenuList(sysMenu: SysMenuQueryDto) {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('m')
      .where(sysMenu)
      .orderBy('m.sort', 'ASC');

    const result = await PaginateHelper.paginate<SysMenuEntity>(
      queryBuilder,
      sysMenu.current,
      sysMenu.pageSize,
    );
    return ApiResponse.success(result);
  }

  async addMenu(sysMenu: SysMenuEntity) {
    const result = await this.menuRepository.save(sysMenu);
    return ApiResponse.successToMessage('添加成功', result);
  }

  async updateMenu(sysMenu: SysMenuEntity) {
    sysMenu.updateAt = new Date();
    const result = await this.menuRepository.update(sysMenu.id, sysMenu);
    return result.affected == 1
      ? ApiResponse.successToMessage('修改成功')
      : ApiResponse.failToMessage('修改失败');
  }

  async delMenu(id: number) {
    const result = await this.menuRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
