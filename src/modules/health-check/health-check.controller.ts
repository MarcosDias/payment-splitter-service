import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { HealthCheck } from '@nestjs/terminus'

@ApiTags('health')
@Controller('health')
export class HealthCheckController {
  @Get()
  @HealthCheck()
  @ApiResponse({ status: 200, description: 'Health check status OK.' })
  checkHealth() {
    return { status: 'ok' }
  }
}
