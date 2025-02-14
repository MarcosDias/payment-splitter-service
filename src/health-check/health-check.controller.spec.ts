import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

describe('HealthCheckController', () => {
  let app: INestApplication
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
  }, 20000);

  beforeEach(async () => {
    process.env.DB_HOST = postgresContainer.getHost();
    process.env.DB_PORT = postgresContainer.getPort().toString();
    process.env.DB_USERNAME = postgresContainer.getUsername();
    process.env.DB_PASSWORD = postgresContainer.getPassword();
    process.env.DB_DATABASE = postgresContainer.getDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  it('should return status "ok" on GET /health', async () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' })
  })

  afterAll(async () => {
    await app.close()
    await postgresContainer.stop();
  })
})
