import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { HealthCheckController } from './health-check.controller'
import { TerminusModule } from '@nestjs/terminus'

describe('HealthCheckController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      imports: [TerminusModule],
    }).compile()

    app = moduleFixture.createNestApplication({ logger: false })
    await app.init()
  })

  it('should return status "ok" on GET /health', async () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' })
  })

  afterAll(async () => {
    await app.close()
  })
})
