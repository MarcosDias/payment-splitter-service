import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { AddExpense } from './dto/add-expense'
import { GroupExpenseService } from 'src/modules/group-expense/group-expense.service'
import { SNSService } from '../aws-services/sns-service/sns.service'

@Injectable()
export class ExpenseService {
  private readonly log = new Logger(ExpenseService.name)

  constructor(
    private readonly groupExpenseService: GroupExpenseService,
    private readonly snsService: SNSService,
  ) {}

  async addExpense(newExpense: AddExpense): Promise<any> {
    this.isValidMember(newExpense)
    const group = this.groupExpenseService.find({ id: newExpense.group.id })
    // sum amount on group.balance (using external lib ex.: https://currency.js.org/)
    // add expensive on group entity
    // save group cascade to save group and a new expense
    this.snsService.sendEmail()
  }

  private isValidMember(newExpense: AddExpense) {
    const isValidRegisterMember = this.groupExpenseService.isValidMember({
      groupId: newExpense.group.id,
      memberId: newExpense.payerMember.id,
    })

    if (!isValidRegisterMember) {
      this.log.error(
        'Error! Invalid parameters, payer or group not correspondents',
      )

      throw new BadRequestException(
        'Error! Member who records the expense must be included in the expense group',
      )
    }
  }
}
