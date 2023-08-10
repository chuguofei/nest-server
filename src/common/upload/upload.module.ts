import { BadRequestException, Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadControll } from './upload.controller';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';
import { checkDirAndCreate } from 'src/utils/file';
import * as moment from 'moment';
import * as nuid from 'nuid';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: (req, file, cb) => {
              const mimeType = file.mimetype.split('/')[1];
              let temp = 'other';
              image.filter((item) => item === mimeType).length > 0
                ? (temp = 'image')
                : '';
              video.filter((item) => item === mimeType).length > 0
                ? (temp = 'video')
                : '';
              audio.filter((item) => item === mimeType).length > 0
                ? (temp = 'audio')
                : '';
              const filePath = `public/${configService.get(
                'uploadDir',
                'uploads',
              )}/${temp}/${moment().format('YYYY-MM-DD')}`;
              checkDirAndCreate(filePath);
              return cb(null, `./${filePath}`);
            },
            filename: (req, file, callback) => {
              const path = nuid.next() + extname(file.originalname);
              callback(null, path);
            },
          }),
          fileFilter(req, file, cb) {
            // const mimeType = file.mimetype.split('/')[1].toLowerCase();
            // let temp = 'other';
            // image.filter((item) => item === mimeType).length > 0
            //   ? (temp = 'image')
            //   : '';
            // video.filter((item) => item === mimeType).length > 0
            //   ? (temp = 'video')
            //   : '';
            // audio.filter((item) => item === mimeType).length > 0
            //   ? (temp = 'audio')
            //   : '';
            // if (temp === 'other') {
            //   return cb(new BadRequestException('文件格式错误！'), false);
            // }
            return cb(null, true);
          },
        };
      },
    }),
  ],
  providers: [UploadService],
  controllers: [UploadControll],
})
export class UploadModule {}
