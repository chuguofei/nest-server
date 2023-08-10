import { Module } from '@nestjs/common';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';
import { ClassifyEntitys } from './classify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassifyEntitys])],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
