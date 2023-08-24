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
      .leftJoinAndSelect('goods.goodsTagsDto', 'goods_tags')
      .orderBy('goods_tags.createAt', 'DESC');

    Object.keys(
      _.omit(goodsPageQuery, 'current', 'pageSize', 'goodsName'),
    ).forEach((key) => {
      if (goodsPageQuery[key]) {
        queryBuilder.andWhere(`goods.${_.snakeCase(key)} = :${key}`, {
          [key]: goodsPageQuery[key],
        });
      }
    });

    queryBuilder.andWhere(`goods.goodsName LIKE :goodsName`, {
      goodsName: `%${goodsPageQuery.goodsName ?? ''}%`,
    });

    const result = await PaginateHelper.paginate<GoodsListDto>(
      queryBuilder,
      goodsPageQuery.current,
      goodsPageQuery.pageSize,
    );
    return ApiResponse.success(result);
  }

  async addGoods(goodsEntitys: GoodsAddDto) {
    try {
      const result = await this.entityManager.transaction(
        async (transaction) => {
          const goodsItem = await transaction
            .createQueryBuilder()
            .insert()
            .into(GoodsEntitys)
            .values(goodsEntitys)
            .execute();

          goodsEntitys.goodsTagsDto.forEach((item) => {
            item.goodsId = goodsItem.raw.insertId;
            item.createAt = new Date();
          });
          await this.goodsTagsService.addGoodsTags(goodsEntitys.goodsTagsDto);
        },
      );
      return ApiResponse.success(result);
    } catch (error) {
      this.logger.error(error);
      return ApiResponse.failToMessage(error.message);
    }
  }

  async updateGoods(goodsEntitys: GoodsAddDto) {
    try {
      await this.entityManager.transaction(async (transaction) => {
        goodsEntitys.updateAt = new Date();
        await transaction
          .createQueryBuilder()
          .update(GoodsEntitys)
          .set(_.omit(goodsEntitys, 'goodsTagsDto'))
          .where('id = :id', { id: goodsEntitys.id })
          .execute();

        await transaction
          .createQueryBuilder()
          .delete()
          .from(GoodsTags)
          .where('goods_id = :goodsId', { goodsId: goodsEntitys.id })
          .execute();

        goodsEntitys.goodsTagsDto.forEach((item) => {
          item.goodsId = goodsEntitys.id;
          item.createAt = new Date();
        });
        await transaction
          .createQueryBuilder()
          .insert()
          .into(GoodsTags)
          .values(goodsEntitys.goodsTagsDto)
          .execute();
      });
      return ApiResponse.successToMessage('修改成功');
    } catch (error) {
      this.logger.error(error);
      return ApiResponse.failToMessage(error.message);
    }
  }

  async delGoods(id: number) {
    try {
      await this.entityManager.transaction(async (transaction) => {
        await transaction
          .createQueryBuilder()
          .delete()
          .from(GoodsTags)
          .where('goods_id = :goodsId', { goodsId: id })
          .execute();

        await transaction
          .createQueryBuilder()
          .delete()
          .from(GoodsEntitys)
          .where('id = :id', { id })
          .execute();
      });
      return ApiResponse.successToMessage('删除成功');
    } catch (error) {
      return ApiResponse.failToMessage(error.message);
    }
  }
}
