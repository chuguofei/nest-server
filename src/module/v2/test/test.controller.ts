import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.schema';
import { ApiResponse } from 'src/core/respone/response';

@Controller('/test')
export class TestController {
  @Inject()
  testService: TestService;

  @Get('list')
  getList() {
    return this.testService.getList();
  }

  @Post('save')
  saveMany(@Body() test: Test[]) {
    return this.testService.save(test);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() test: Test) {
    const flag = await this.testService.update(id, test);
    if (flag) {
      return ApiResponse.success('修改成功');
    } else {
      return ApiResponse.failToMessage('修改失败');
    }
  }

  @Delete('del/:id')
  async del(@Param('id') id: string) {
    const flag = await this.testService.del(id);
    if (flag) {
      return ApiResponse.successToMessage('删除成功');
    } else {
      return ApiResponse.failToMessage('删除失败');
    }
  }
}
