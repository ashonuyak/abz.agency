import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { UserValidationException } from '../user/exceptions'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const message = exception.message

    if (exception instanceof UserValidationException) {
      response.status(status).json({
        success: false,
        message: message,
        fails: exception.stack,
      })
    } else {
      response.status(status).json({
        success: false,
        message: message,
      })
    }
  }
}
