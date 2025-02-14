import { Module } from '@nestjs/common'
import { HealthCheckModule } from './health-check/health-check.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HealthCheckModule,
    DatabaseModule,
  ],
})
export class AppModule {}
