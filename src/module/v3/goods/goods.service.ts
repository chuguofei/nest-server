import { Inject, Injectable } from '@nestjs/common';
import { GoodsEntitys } from './goods.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/core/respone/response';
import { EntityManager, Repository } from 'typeorm';
import * as _ from 'lodash';
import { LoggerService } from 'src/common/logger/logger.service';
import { GoodsPageQuery } from './dto/goods.page.entity';
import { GoodsListDto } from './dto/goods.list.entity';
import { GoodsTagsService } from '../goods_tags/GoodsTags.service';
import { GoodsAddDto } from './dto/goods.add.entity';
import { PaginateHelper } from 'src/core/help/PaginateHelper';
import { GoodsTags } from '../goods_tags/GoodsTags.entity';

@Injectable()
export class GoodsService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  @InjectRepository(GoodsEntitys)
  private readonly goodsRepository: Repository<GoodsEntitys>;

  @InjectRepository(GoodsListDto)
  private readonly goodsListDto: Repository<GoodsListDto>;

  @Inject(GoodsTagsService)
  private readonly goodsTagsService: GoodsTagsService;

  @InjectRepository(GoodsTags)
  private readonly goodsTagsRepository: Repository<GoodsTags>;

  constructor(private readonly logger: LoggerService) {}

  async getGoodsList(GoodsEntitys: GoodsEntitys) {
    const queryBuilder = this.goodsRepository.createQueryBuilder('g');
    Object.keys(GoodsEntitys).forEach((key) => {
      if (GoodsEntitys[key]) {
        queryBuilder.andWhere(`g.${_.snakeCase(key)} = :${key}`, {
          [key]: GoodsEntitys[key],
        });
      }
    });

    const result = await queryBuilder.getMany();
    return ApiResponse.success(result);
  }

  async getGoodsListForShop(goodsPageQuery: GoodsPageQuery) {
    const queryBuilder = this.goodsListDto
      .createQueryBuilder('goods')
      .leftJoinAndSelect('goods.classify', 'classify')
      .leftJoinAndSelect('goods.shop', 'shop')
      .leftJoinAndSelect('goods.goodsTagsDto', 'goods_tags');

    Object.keys(_.omit(goodsPageQuery, 'current', 'pageSize')).forEach(
      (key) => {
        if (goodsPageQuery[key]) {
          queryBuilder.andWhere(`goods.${_.snakeCase(key)} = :${key}`, {
            [key]: goodsPageQuery[key],
          });
        }
      },
    );

    const result = await PaginateHelper.paginate<GoodsListDto>(
      queryBuilder,
      goodsPageQuery.current,
      goodsPageQuery.pageSize,
    );
    return ApiResponse.success(result);
  }

  async addGoods(goodsEntitys: GoodsAddDto) {
    const result = this.entityManager
      .transaction(async () => {
        const goodsItem = await this.goodsRepository.save<GoodsEntitys>(
          goodsEntitys,
        );
        goodsEntitys.goodsTagsDto.forEach((item) => {
          item.goodsId = goodsItem.id;
        });
        await this.goodsTagsService.addGoodsTags(goodsEntitys.goodsTagsDto);
      })
      .catch((error) => {
        return ApiResponse.failToMessage(error);
      });
    return ApiResponse.success(result);
  }

  async updateGoods(goodsEntitys: GoodsAddDto) {
    this.entityManager
      .transaction(async () => {
        goodsEntitys.updateAt = new Date();
        await this.goodsRepository.update(
          goodsEntitys.id,
          _.omit(goodsEntitys, 'goodsTagsDto'),
        );
        await this.goodsTagsRepository
          .createQueryBuilder()
          .delete()
          .from(GoodsTags)
          .where('goods_id = :goodsId', { goodsId: goodsEntitys.id })
          .execute();
        goodsEntitys.goodsTagsDto.forEach((item) => {
          item.goodsId = goodsEntitys.id;
        });
        await this.goodsTagsService.addGoodsTags(goodsEntitys.goodsTagsDto);
      })
      .catch((error) => {
        return ApiResponse.failToMessage('修改失败');
      });

    return ApiResponse.successToMessage('删除成功');
  }

  async delGoods(id: number) {
    const result = await this.goodsRepository.delete(id);
    return result.affected == 1
      ? ApiResponse.successToMessage('删除成功')
      : ApiResponse.failToMessage('删除失败');
  }
}
