import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  CreateGroupExpenseDto,
  GroupIdDto,
  MemberInGroup as MemberInGroupDTO,
} from './dto/dto'
import { MemberService } from './member.service'
import { InjectRepository } from '@nestjs/typeorm'
import { GroupExpense } from './entities/group-expense.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GroupExpenseService {
  private readonly log = new Logger(GroupExpenseService.name)

  constructor(
    @InjectRepository(GroupExpense)
    private groupExpenseRepository: Repository<GroupExpense>,
    private readonly memberService: MemberService,
  ) {}

  async createGroup(
    createGroupExpenseDto: CreateGroupExpenseDto,
  ): Promise<GroupExpense> {
    const promiseMembers = await createGroupExpenseDto.members.map(
      async memberDto => {
        this.log.log('load member to create a group')
        return this.memberService.findOrCreate(memberDto)
      },
    )

    const members = await Promise.all(promiseMembers)

    const group = await this.groupExpenseRepository.save({
      name: createGroupExpenseDto.name,
      members: members,
    })

    this.log.log(
      `Groups and potential members successfully created. Group id [${group.id}]`,
    )

    return group
  }

  async find(groupDTO: GroupIdDto): Promise<GroupExpense | null> {
    const group = await this.groupExpenseRepository.findOne({
      where: { id: groupDTO.id },
      relations: { members: true },
    })

    if (group === null) {
      const msg = `Error! GroupExpense with id [${groupDTO.id}] not found`
      this.log.error(msg)
      throw new NotFoundException(msg)
    }

    this.log.log(`GroupExpense with id [${groupDTO.id}] found with successful`)
    return group
  }

  async isValidMember(memberInGroup: MemberInGroupDTO): Promise<boolean> {
    const group = await this.find({ id: memberInGroup.groupId })
    if (group != null) {
      const membersFiltered = group?.members.filter(
        member => member.id === memberInGroup.memberId,
      )
      return membersFiltered.length > 0
    }
    return false
  }
}
