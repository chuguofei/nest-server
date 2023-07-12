import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysDeptController } from './SysDept.controller';
import { SysDeptService } from './SysDept.service';
import { SysDeptEntity } from './SysDept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysDeptEntity])],
  controllers: [SysDeptController],
  providers: [SysDeptService],
})
export class SysDeptModule {}
