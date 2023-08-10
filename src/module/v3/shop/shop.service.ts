import { Injectable } from '@nestjs/common';
import { ShopEntitys } from './shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/core/respone/response';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { LoggerService } from 'src/common/logger/logger.service';
import { PaginateHelper } from 'src/core/help/PaginateHelper';
import { ShopPageQuery } from './dto/ShopPageQuery.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntitys)
    private readonly ShopRepository: Repository<ShopEntitys>,
    private readonly logger: LoggerService,
  ) {}

  async getShopList(query: ShopPageQuery) {
    const queryBuilder = this.ShopRepository.createQueryBuilder('shop');

    Object.keys(_.omit(query, 'current', 'pageSize')).forEach((key) => {
      if (query[key]) {
        queryBuilder.andWhere(`shop.${_.snakeCase(key)} = :${key}`, {
          [key]: query[key],
        });
      }
    });

    queryBuilder.orWhere(`shop.shop_name LIKE :shopName`, {
      shopName: `%${query.shopName ?? ''}%`,
    });

    const result = await PaginateHelper.paginate<ShopEntitys>(
      queryBuilder,
      query.current,
      query.pageSize,
    );

    return ApiResponse.success(result);
  }

  async addShop(shopEntitys: ShopEntitys) {
    const result = await this.ShopRepository.save<ShopEntitys>(shopEntitys);
    return ApiResponse.success(result);
  }

  async updateShop(shopEntitys: ShopEntitys) {
    shopEntitys.updateAt = new Date();
    const result = await this.ShopRepository.update(
      shopEntitys.id,
      shopEntitys,
    );
    return result.affected == 1
      ? ApiResponse.successToMessage('修改成功')
      : ApiResponse.failToMessage('修改失败');
  }

  async delShop(id: number) {
    const result = await this.ShopRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
