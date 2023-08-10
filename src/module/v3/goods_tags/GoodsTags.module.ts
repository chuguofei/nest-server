import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsTags } from './GoodsTags.entity';
import { GoodsTagsService } from './GoodsTags.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsTags])],
  providers: [GoodsTagsService],
  exports: [GoodsTagsService],
})
export class GoodsTagsModule {}
