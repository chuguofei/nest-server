import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';

@Module({
  imports: [TestModule],
})
export class V2Module {}
