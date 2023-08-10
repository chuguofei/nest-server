import { Injectable } from '@nestjs/common';
import { ClassifyEntitys } from './classify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/core/respone/response';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/common/logger/logger.service';
import { PaginateHelper } from 'src/core/help/PaginateHelper';
import { QueryPageDto } from './dto/classifyQueryDto';
import * as _ from 'lodash';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(ClassifyEntitys)
    private readonly classifyRepository: Repository<ClassifyEntitys>,
    private readonly logger: LoggerService,
  ) {}

  async getClassifyList(query: QueryPageDto) {
    const queryBuilder = this.classifyRepository.createQueryBuilder('classify');
    Object.keys(_.omit(query, 'current', 'pageSize')).forEach((key) => {
      if (query[key]) {
        queryBuilder.andWhere(`classify.${_.snakeCase(key)} = :${key}`, {
          [key]: query[key],
        });
      }
    });

    const result = await PaginateHelper.paginate<ClassifyEntitys>(
      queryBuilder,
      query.current,
      query.pageSize,
    );
    return ApiResponse.success(result);
  }

  async addClassify(ClassifyEntitys: ClassifyEntitys) {
    const result = await this.classifyRepository.save<ClassifyEntitys>(
      ClassifyEntitys,
    );
    return ApiResponse.success(result);
  }

  async updateClassify(ClassifyEntitys: ClassifyEntitys) {
    ClassifyEntitys.updateAt = new Date();
    const result = await this.classifyRepository.update(
      ClassifyEntitys.id,
      ClassifyEntitys,
    );
    return result.affected == 1
      ? ApiResponse.successToMessage('修改成功')
      : ApiResponse.failToMessage('修改失败');
  }

  async delClassify(id: number) {
    const count = await this.classifyRepository
      .createQueryBuilder('c')
      .where(`c.pid = :pid`, { pid: id })
      .getCount();

    if (count > 0) {
      return ApiResponse.failToMessage('当前分类被被引用，不可删除');
    }
    const result = await this.classifyRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
