import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateGroupExpenseDto {
  @ApiProperty({
    type: String,
    description: 'Name of group',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Group name must have at least 3 characters.' })
  name: string

  @ApiProperty({
    type: () => [MembersDTO],
    description: 'List of members',
  })
  @IsNotEmpty()
  members: MembersDTO[]
}

export class MembersDTO {
  @ApiProperty({
    type: String,
    description: 'Name of member',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Member name must have at least 3 characters.' })
  name: string

  @ApiProperty({
    type: String,
    description: 'Email of member',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class GroupIdDto {
  @IsString()
  @IsNotEmpty()
  id: string
}

export class MemberIdDto {
  @IsString()
  @IsNotEmpty()
  id: string
}

export class MemberInGroup {
  @IsString()
  @IsNotEmpty()
  groupId: string

  @IsString()
  @IsNotEmpty()
  memberId: string
}
