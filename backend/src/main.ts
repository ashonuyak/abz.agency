import { NestFactory } from '@nestjs/core'

import { AppModule } from './AppModule'
import { ConfigService } from './configuration'
import { HttpExceptionFilter, ResponseInterceptor } from './middlewares'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule.register(new ConfigService()))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()
