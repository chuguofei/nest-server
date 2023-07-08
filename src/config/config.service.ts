import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import { get } from 'lodash';

@Injectable()
export class ConfigService {
  private readonly config: Record<string, any>;

  constructor() {
    const YAML_CONFIG_ENV = `config.${process.env.NODE_ENV || 'dev'}.yaml`;
    const yamlData = fs.readFileSync(
      path.join(__dirname, '../../config', YAML_CONFIG_ENV),
      'utf-8',
    );
    this.config = yaml.load(yamlData);
  }

  get<T>(key: string): T {
    return get(this.config, key);
  }

  curEnv<T>(env: string): T {
    return (process.env.NODE_ENV === env) as T;
  }

  isDev<T>(): T {
    return (process.env.NODE_ENV === 'dev') as T;
  }

  isProd<T>(): T {
    return (process.env.NODE_ENV === 'prod') as T;
  }

  isTest<T>(): T {
    return (process.env.NODE_ENV === 'test') as T;
  }
}
