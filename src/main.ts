import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './config/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  SwaggerConfig.config(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
