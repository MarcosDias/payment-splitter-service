import { Module } from '@nestjs/common'
import { GroupExpenseController } from './group-expense.controller'
import { GroupExpenseService } from './group-expense.service'
import { MemberService } from './member.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupExpense } from './entities/group-expense.entity'
import { Member } from './entities/member.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GroupExpense, Member])],
  controllers: [GroupExpenseController],
  providers: [GroupExpenseService, MemberService],
  exports: [GroupExpenseService, MemberService],
})
export class GroupExpenseModule {}
