import { Module } from '@nestjs/common'
import { HealthCheckController } from './health-check.controller'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  controllers: [HealthCheckController],
  imports: [TerminusModule],
})
export class HealthCheckModule {}
