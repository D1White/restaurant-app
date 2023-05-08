import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 11000) {
      response.status(400).json({
        statusCode: 400,
        message: 'Duplicate key error',
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: exception.message,
      });
    }
  }
}
