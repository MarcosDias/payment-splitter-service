import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Member } from './member.entity'

@Entity()
export class GroupExpense {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @Column({ type: 'varchar', length: 100 })
  name: string

  @ManyToMany(() => Member, member => member.groups, { cascade: true })
  @JoinTable({
    name: 'member_groups_expense',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'memberId', referencedColumnName: 'id' },
  })
  members: Member[]
}
