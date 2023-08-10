import {
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/core/respone/response';
import { Response } from 'express';

@Controller('/common/upload')
export class UploadControll {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  image(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    file.path = file.path.replace(/\\/g, '/').replace('public', '');
    return res.status(HttpStatus.OK).send(ApiResponse.success(file.path));
  }
}
