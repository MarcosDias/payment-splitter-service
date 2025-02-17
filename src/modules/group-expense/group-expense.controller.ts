import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateGroupExpenseDto } from './dto/dto'
import { GroupExpenseService } from './group-expense.service'
import { GroupExpense } from './entities/group-expense.entity'

@ApiTags('GroupExpenses')
@Controller('group')
export class GroupExpenseController {
  constructor(private readonly groupExpenseService: GroupExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group expense.' })
  @ApiResponse({
    status: 201,
    description: 'The group expense has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createGroup(
    @Body() createGroupExpenseDto: CreateGroupExpenseDto,
  ): Promise<GroupExpense> {
    return this.groupExpenseService.createGroup(createGroupExpenseDto)
  }
}
