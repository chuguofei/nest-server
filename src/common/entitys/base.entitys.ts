import { Entity } from 'typeorm';

@Entity()
export class BaseEntity {
  pageSize: number;
  current: number;
}
