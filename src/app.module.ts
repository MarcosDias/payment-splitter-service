import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health-check/health-check.module'
import { DatabaseModule } from './modules/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { GroupExpenseModule } from './modules/group-expense/group-expense.module'
import { ExpenseModule } from './modules/expense/expense.module'
import { AwsServicesModule } from './modules/aws-services/aws-services.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HealthCheckModule,
    DatabaseModule,
    GroupExpenseModule,
    ExpenseModule,
    AwsServicesModule,
  ],
})
export class AppModule {}
