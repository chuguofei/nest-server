import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './test.schema';
import { Model } from 'mongoose';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test>,
    private readonly logger: LoggerService,
  ) {}

  save(test: Test[]) {
    return this.testModel.insertMany(test);
  }

  async getList() {
    return await this.testModel.find({ name: 'User1' });
  }

  async update(id: string, test: Test) {
    return await this.testModel.findOneAndUpdate({ itemId: id }, test, {
      new: true,
    });
  }

  async del(id: string) {
    return await this.testModel.findByIdAndDelete(id);
  }
}
