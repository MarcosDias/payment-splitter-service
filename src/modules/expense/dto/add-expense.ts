import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'
import { GroupIdDto, MemberIdDto } from 'src/modules/group-expense/dto/dto'

export class AddExpense {
  group: GroupIdDto
  payerMember: MemberIdDto

  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number
}
