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
import { ClassifyEntitys } from './classify.entity';
import { ClassifyService } from './classify.service';
import { QueryPageDto } from './dto/classifyQueryDto';

@Controller('/shopping/classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Get('getClassifyList')
  getClassifyList(@Query() sysClassify: QueryPageDto) {
    return this.classifyService.getClassifyList(sysClassify);
  }

  @Post('addClassify')
  addClassify(@Body() sysClassify: ClassifyEntitys) {
    return this.classifyService.addClassify(sysClassify);
  }

  @Put('updateClassify')
  updateClassify(@Body() sysClassify: ClassifyEntitys) {
    return this.classifyService.updateClassify(sysClassify);
  }

  @Delete('delClassify/:id')
  delClassify(@Param('id') id: number) {
    return this.classifyService.delClassify(id);
  }
}
