import { Injectable, Logger } from '@nestjs/common'
import { MembersDTO } from './dto/dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MemberService {
  private readonly log = new Logger(MemberService.name)

  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async findOrCreate(dto: MembersDTO): Promise<Member> {
    let member = await this.memberRepository.findOne({
      where: { email: dto.email },
    })
    if (member === null) {
      this.log.warn(`member not found ${dto.email}`)
      member = await this.memberRepository.save({
        name: dto.name,
        email: dto.email,
      })
    }
    return member
  }
}
