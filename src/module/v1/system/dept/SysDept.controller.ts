import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { SysDeptService } from './SysDept.service';
import { SysDeptEntity } from './SysDept.entity';

@Controller('/v1/sys/Dept')
export class SysDeptController {
  constructor(private readonly sysDeptService: SysDeptService) {}

  @Get('getDeptList')
  getDeptList(@Query() sysDept: SysDeptEntity) {
    return this.sysDeptService.getDeptList(sysDept);
  }

  @Post('addDept')
  addDept(@Body() sysDept: SysDeptEntity) {
    return this.sysDeptService.addDept(sysDept);
  }

  @Put('updateDept')
  updateDept(@Body() sysDept: SysDeptEntity) {
    return this.sysDeptService.updateDept(sysDept);
  }

  @Delete('delDept/:id')
  delDept(@Param() id: number) {
    return this.sysDeptService.delDept(id);
  }
}
