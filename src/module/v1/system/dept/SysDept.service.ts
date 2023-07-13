import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/core/respone/response';
import { SysDeptEntity } from './SysDept.entity';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class SysDeptService {
  constructor(
    @InjectRepository(SysDeptEntity)
    private readonly deptRepository: Repository<SysDeptEntity>,
    private readonly logger: LoggerService,
  ) {}

  async getDeptList(sysDept: SysDeptEntity) {
    const result = await this.deptRepository
      .createQueryBuilder('d')
      .where(sysDept)
      .getMany();

    return ApiResponse.success(result);
  }

  async addDept(sysDept: SysDeptEntity) {
    const result = await this.deptRepository.save<SysDeptEntity>(sysDept);
    return ApiResponse.success(result);
  }

  async updateDept(sysDept: SysDeptEntity) {
    sysDept.updateAt = new Date();
    const result = await this.deptRepository.update(sysDept.id, sysDept);
    return result.affected == 1
      ? ApiResponse.successToMessage('修改成功')
      : ApiResponse.failToMessage('修改失败');
  }

  async delDept(id: number) {
    const result = await this.deptRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
