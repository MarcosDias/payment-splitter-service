import { Test, TestingModule } from '@nestjs/testing'
import { SNSService } from './sns.service'

describe('S3ServiceService', () => {
  let service: SNSService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SNSService],
    }).compile()

    service = module.get<SNSService>(SNSService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
