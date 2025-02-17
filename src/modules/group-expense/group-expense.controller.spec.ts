import { Test, TestingModule } from '@nestjs/testing'
import { GroupExpenseController } from './group-expense.controller'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { createGroupExpenseDto } from './mock'
import { GroupExpenseService } from './group-expense.service'
import { MemberService } from './member.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupExpense } from './entities/group-expense.entity'
import { Member } from './entities/member.entity'
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'

describe('GroupExpenseController', () => {
  let app: INestApplication
  let postgresContainer: StartedPostgreSqlContainer

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start()
  }, 20000)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: postgresContainer.getHost(),
          port: postgresContainer.getPort(),
          username: postgresContainer.getUsername(),
          password: postgresContainer.getPassword(),
          database: postgresContainer.getDatabase(),
          entities: [GroupExpense, Member],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([GroupExpense, Member]),
      ],
      controllers: [GroupExpenseController],
      providers: [GroupExpenseService, MemberService],
    }).compile()

    app = module.createNestApplication({ logger: false })
    await app.init()
  })

  it('should return status "ok" on GET /health', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/group')
      .send(createGroupExpenseDto)
      .expect(201)

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        members: expect.any(Array<Member>),
      }),
    )
    expect(new Date(body.createdAt)).toBeInstanceOf(Date)
    expect(new Date(body.updatedAt)).toBeInstanceOf(Date)
  })

  afterAll(async () => {
    await app.close()
    await postgresContainer.stop()
  })
})
