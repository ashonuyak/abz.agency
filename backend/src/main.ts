import { NestFactory } from '@nestjs/core'
import { urlencoded, json } from 'express'

import { AppModule } from './AppModule'
import { HttpExceptionFilter, ResponseInterceptor } from './middlewares'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(process.env.PORT || 3002)
}
bootstrap()
