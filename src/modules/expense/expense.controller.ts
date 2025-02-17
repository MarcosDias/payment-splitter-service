import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ExpenseService } from './expense.service'

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
}
