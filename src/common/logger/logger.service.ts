import { Injectable, Inject } from '@nestjs/common';
import { Logger, createLogger, format, LogEntry } from 'winston';
import * as winston from 'winston';
import { ConfigService } from 'src/config/config.service';
import * as Transport from 'winston-transport';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as chalk from 'chalk';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  static winstonCombine = [
    format.label({
      label: '[LOGGER]',
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:MM:SS',
    }),
    format.printf(
      (info) =>
        `${info.label} [${chalk.red(info.timestamp)}] [${info.level}] [File: ${
          info.meta.file
        }, Line: ${info.meta.line}]: ${info.message}`,
    ),
  ];

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.logger = LoggerService.createLogger(configService);
  }

  private static createLogger(configService: ConfigService): Logger {
    const IS_DEV = configService.isDev<boolean>();
    const console = configService.get('logger.console');
    const loggerTransports: Transport[] = [];

    if (!IS_DEV) {
      loggerTransports.push(
        new winston.transports.DailyRotateFile({
          dirname: `logs`,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(...this.winstonCombine),
        }),
      );
    }

    if (!!console) {
      loggerTransports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
            ...this.winstonCombine,
          ),
        }),
      );
    }

    return createLogger({
      transports: loggerTransports,
    });
  }

  private getStackInfo(): { file: string; line: string } {
    const stacklist = new Error().stack.split('\n').slice(3);
    const stackReg = /at\s+()(.*):(\d*):(\d*)/gi;
    const s = stacklist[0];
    const sp = stackReg.exec(s);

    if (sp && sp.length === 5) {
      return {
        file: chalk.blue(
          path.relative(
            path.join(__dirname, '../../../'),
            path.basename(sp[2]),
          ),
        ),
        line: chalk.blue(sp[3]),
      };
    }

    return { file: '', line: '' };
  }

  private logWithStackInfo(level: string, args: any[]) {
    const stackInfo = this.getStackInfo();
    const message = args.join(' ');
    const logEntry: LogEntry = { level, message };
    if (stackInfo.file) {
      logEntry.meta = { file: stackInfo.file, line: stackInfo.line };
    }
    this.logger.log(logEntry);
  }

  debug(...args: any[]) {
    this.logWithStackInfo('debug', args);
  }

  info(...args: any[]) {
    this.logWithStackInfo('info', args);
  }

  warn(...args: any[]) {
    this.logWithStackInfo('warn', args);
  }

  error(...args: any[]) {
    this.logWithStackInfo('error', args);
  }

  console(message: string) {
    console.log(chalk.red(message));
  }
}
