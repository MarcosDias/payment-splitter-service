import { Repository } from 'typeorm'
import { Member } from './entities/member.entity'
import { MemberService } from './member.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { member, memberDto } from './mock'

describe('MemberService', () => {
  let service: MemberService
  let repository: Repository<Member>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<MemberService>(MemberService)
    repository = module.get<Repository<Member>>(getRepositoryToken(Member))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should find member', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(member)

    expect(await service.findOrCreate(memberDto)).toBe(member)
  })

  it('should create a new member if not found a member', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null)
    jest.spyOn(repository, 'save').mockResolvedValue(member)

    expect(await service.findOrCreate(memberDto)).toBe(member)
  })
})
