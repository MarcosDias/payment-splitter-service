import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class GroupMemberTableCreate1739638310410 implements MigrationInterface {
  groupExpenseTable = new Table({
    name: 'group_expense',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
    ],
  })

  memberTable = new Table({
    name: 'member',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
    ],
  })

  joinTable = new Table({
    name: 'member_groups_expense',
    columns: [
      {
        name: 'groupId',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'memberId',
        type: 'varchar',
        isPrimary: true,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['groupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'group_expense',
      },
      {
        columnNames: ['memberId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'member',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.memberTable)
    await queryRunner.createTable(this.groupExpenseTable)
    await queryRunner.createTable(this.joinTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.joinTable)
    await queryRunner.dropTable(this.memberTable)
    await queryRunner.dropTable(this.groupExpenseTable)
  }
}
