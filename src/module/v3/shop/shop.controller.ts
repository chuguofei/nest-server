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
import { ShopEntitys } from './shop.entity';
import { ShopService } from './shop.service';
import { ShopPageQuery } from './dto/ShopPageQuery.entity';

@Controller('/shopping/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('getShopList')
  getShopList(@Query() sysShop: ShopPageQuery) {
    return this.shopService.getShopList(sysShop);
  }

  @Post('addShop')
  addShop(@Body() sysShop: ShopEntitys) {
    return this.shopService.addShop(sysShop);
  }

  @Put('updateShop')
  updateShop(@Body() sysShop: ShopEntitys) {
    return this.shopService.updateShop(sysShop);
  }

  @Delete('delShop/:id')
  delShop(@Param() id: number) {
    return this.shopService.delShop(id);
  }
}
