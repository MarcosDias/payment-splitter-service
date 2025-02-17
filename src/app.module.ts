import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health-check/health-check.module'
import { DatabaseModule } from './modules/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { GroupExpenseModule } from './modules/group-expense/group-expense.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HealthCheckModule,
    DatabaseModule,
    GroupExpenseModule,
  ],
})
export class AppModule {}
