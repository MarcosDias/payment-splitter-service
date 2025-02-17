import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './config/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  SwaggerConfig.config(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
