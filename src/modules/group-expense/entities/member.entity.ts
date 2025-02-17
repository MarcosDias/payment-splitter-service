import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GroupExpense } from './group-expense.entity'

@Entity()
export class Member {
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

  @Column({ type: 'varchar', length: 254, unique: true })
  email: string

  @ManyToMany(() => GroupExpense, group => group.members)
  groups: GroupExpense[]
}
