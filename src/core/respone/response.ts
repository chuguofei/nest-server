import { get } from 'lodash';
import { ErrorShowType } from './response-type';

export enum ResponseCode {
  SUCCESS = 200,
  FAILURE = 201,
  ERROR = 500,
  PARAM_ERROR = 1000,
  INVALID_TOKEN = 2001,
  ACCESS_DENIED = 2002,
  USERNAME_OR_PASSWORD_ERROR = 2003,
}

export const ResponseMessage = {
  [ResponseCode.SUCCESS]: '操作成功!',
  [ResponseCode.FAILURE]: '操作失败',
  [ResponseCode.ERROR]: '系统异常，请稍后重试',
  [ResponseCode.PARAM_ERROR]: '参数异常',
  [ResponseCode.INVALID_TOKEN]: '访问令牌不合法',
  [ResponseCode.ACCESS_DENIED]: '没有权限访问该资源',
  [ResponseCode.USERNAME_OR_PASSWORD_ERROR]: '用户名或密码错误',
};

export class ApiResponse<T> {
  code: number;
  message: string;
  rows: T;
  meta: Record<string, any>;
  showType: ErrorShowType;
  constructor(
    code: number,
    message: string,
    result?: T,
    meta?: Record<string, any>,
    showType?: ErrorShowType,
  ) {
    this.code = code;
    this.message = message;
    this.rows = result;
    if (meta) this.meta = meta;
    if (showType) this.showType = showType;
  }

  static successToMessage<T>(message: string, result?: T): ApiResponse<T> {
    return new ApiResponse<T>(ResponseCode.SUCCESS, message, result);
  }

  static success<T>(result?: T): ApiResponse<T> {
    if (get(result, 'data')) {
      return new ApiResponse<T>(
        ResponseCode.SUCCESS,
        ResponseMessage[ResponseCode.SUCCESS],
        result['data'],
        result['meta'],
      );
    }
    return new ApiResponse<T>(
      ResponseCode.SUCCESS,
      ResponseMessage[ResponseCode.SUCCESS],
      result,
    );
  }

  static failShowType<T>(
    code: number,
    message: string,
    showType: ErrorShowType,
  ): ApiResponse<T> {
    const respone = new ApiResponse<T>(code, message);
    respone.showType = showType;
    return respone;
  }

  static failToCodeMessage<T>(code: number, message: string): ApiResponse<T> {
    return new ApiResponse<T>(code, message);
  }

  static failToMessage<T>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(ResponseCode.ERROR, message);
  }

  static fail<T>(): ApiResponse<T> {
    return new ApiResponse<T>(
      ResponseCode.ERROR,
      ResponseMessage[ResponseCode.ERROR],
    );
  }
}
