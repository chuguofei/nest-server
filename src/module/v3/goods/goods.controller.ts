import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GoodsEntitys } from './goods.entity';
import { GoodsService } from './goods.service';
import { GoodsPageQuery } from './dto/goods.page.entity';
import { GoodsTagsDto } from './dto/goods.tags.entity';
import { GoodsAddDto } from './dto/goods.add.entity';

@Controller('/shopping/goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('getGoodsList')
  getgoodsList(@Query() sysgoods: GoodsEntitys) {
    return this.goodsService.getGoodsList(sysgoods);
  }

  @Post('addGoods')
  addgoods(@Body() goodAddDto: GoodsAddDto) {
    return this.goodsService.addGoods(goodAddDto);
  }

  @Put('updateGoods')
  updategoods(@Body() goodsAddDto: GoodsAddDto) {
    return this.goodsService.updateGoods(goodsAddDto);
  }

  @Delete('delGoods/:id')
  delgoods(@Param('id') id: number) {
    return this.goodsService.delGoods(id);
  }

  @Get('getGoodsListForShop')
  getGoodsListForShop(@Query() goodsPageQuery: GoodsPageQuery) {
    return this.goodsService.getGoodsListForShop(goodsPageQuery);
  }
}
