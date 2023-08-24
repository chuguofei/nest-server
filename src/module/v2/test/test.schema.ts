import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'test' })
export class Test extends Document {
  @Prop()
  itemId: string;

  @Prop()
  itemName: string;

  @Prop()
  itemCode: string;

  @Prop()
  itemPic: string;

  @Prop()
  createTime: string;

  @Prop()
  type: string;

  @Prop()
  sort: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
