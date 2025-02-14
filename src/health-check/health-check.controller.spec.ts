import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'

describe('HealthCheckController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
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
