import { Repository } from 'typeorm'
import { GroupExpense } from './entities/group-expense.entity'
import { GroupExpenseService } from './group-expense.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MemberService } from './member.service'
import { createGroupExpenseDto, group, mockMemberService } from './mock'
import { NotFoundException } from '@nestjs/common'

describe('GroupExpenseService', () => {
  let groupExpenseService: GroupExpenseService
  let memberService: MemberService
  let repository: Repository<GroupExpense>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupExpenseService,
        {
          provide: MemberService,
          useValue: mockMemberService,
        },
        {
          provide: getRepositoryToken(GroupExpense),
          useClass: Repository,
        },
      ],
    }).compile()

    groupExpenseService = module.get<GroupExpenseService>(GroupExpenseService)
    memberService = module.get<MemberService>(MemberService)
    repository = module.get<Repository<GroupExpense>>(
      getRepositoryToken(GroupExpense),
    )
  })

  it('should be defined', () => {
    expect(groupExpenseService).toBeDefined()
  })

  it('should create a new group expense', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(group)

    expect(await groupExpenseService.createGroup(createGroupExpenseDto)).toBe(
      group,
    )
  })

  it('should search a group expense and found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(group)

    const groupFound = await groupExpenseService.find({ id: group.id })
    expect(groupFound).toBeDefined()
    expect(groupFound?.id).toEqual(group.id)
  })

  it('should search a group expense but not found', () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null)

    expect(groupExpenseService.find({ id: '<not valid id>' })).rejects.toThrow(
      NotFoundException,
    )
  })
})
