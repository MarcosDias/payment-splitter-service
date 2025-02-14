import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

import * as packageJson from '../../package.json'

export class SwaggerConfig {
  static config(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setVersion(packageJson.version)
      .build()

    const path = 'docs'
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup(path, app, document)
  }
}
