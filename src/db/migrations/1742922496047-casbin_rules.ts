import { CasbinRuleCreateDto } from 'src/auth/dtos/casbin_rule.create.dto'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class CasbinRules1742922496047 implements MigrationInterface {
  name = 'CasbinRules1742922496047'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const rules: CasbinRuleCreateDto[] = [
      {
        subject: 'ADMINISTRATOR',
        object: '/auth/register',
        action: 'GET|POST',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/auth',
        action: 'GET|POST',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/auth/policy',
        action: 'GET|POST|PUT|DELETE',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/roles',
        action: 'GET|POST',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/roles/:id',
        action: 'GET|PUT|DELETE',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/items/:id',
        action: 'GET|PUT|DELETE',
      },
      {
        subject: 'ADMINISTRATOR',
        object: '/items',
        action: 'GET|PUT|DELETE',
      },
    ]

    let query: string = ''

    rules.forEach((rule, index) => {
      query += `('p', '${rule.subject}', '${rule.object}', '${rule.action}')`
      if (index < rules.length - 1) {
        query += `, `
      }
    })

    await queryRunner.query(`INSERT INTO casbin_rule (ptype, v0, v1, v2) VALUES
    ${query};`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
