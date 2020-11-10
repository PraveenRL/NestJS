import { ArgumentsHost, Catch, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Logger.error(exception, 'Exception thrown');
    super.catch(exception, host);
  }
}