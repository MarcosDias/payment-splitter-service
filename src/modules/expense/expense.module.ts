import { Module } from '@nestjs/common'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { GroupExpenseModule } from 'src/modules/group-expense/group-expense.module'
import { AwsServicesModule } from '../aws-services/aws-services.module'

@Module({
  imports: [GroupExpenseModule, AwsServicesModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
