import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/common/logger/logger.service';
import { Repository } from 'typeorm';
import { GoodsTags } from './GoodsTags.entity';

@Injectable()
export class GoodsTagsService {
  constructor(
    @InjectRepository(GoodsTags)
    private readonly goodsTagsRepository: Repository<GoodsTags>,
    private readonly logger: LoggerService,
  ) {}

  async addGoodsTags(goodsTags: GoodsTags[]) {
    return await this.goodsTagsRepository.save<GoodsTags>(goodsTags);
  }
}
