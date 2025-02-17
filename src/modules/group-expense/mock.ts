import { faker } from '@faker-js/faker'
import { Member } from './entities/member.entity'
import { GroupExpense } from './entities/group-expense.entity'
import { CreateGroupExpenseDto, MembersDTO as MemberDTO } from './dto/dto'

export const member = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.internet.displayName(),
} as Member

export const group = {
  id: faker.string.uuid(),
  name: faker.internet.displayName(),
  members: [member],
} as GroupExpense

export const memberDto = {
  name: faker.person.firstName('male'),
  email: faker.internet.email(),
} as MemberDTO

export const createGroupExpenseDto = {
  name: faker.internet.displayName(),
  members: [memberDto],
} as CreateGroupExpenseDto

export const mockMemberService = {
  findOrCreate: jest.fn().mockResolvedValue(member),
}
