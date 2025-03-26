import { MigrationInterface, QueryRunner } from 'typeorm'

export class CasbinRules1742922496047 implements MigrationInterface {
  name = 'CasbinRules1742922496047'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO casbin_rule (ptype, v0, v1, v2) VALUES
      ('p', 'ADMINISTRATOR', '/auth/register', 'GET|POST'),
      ('p', 'ADMINISTRATOR', '/auth', 'GET|POST'),
      ('p', 'ADMINISTRATOR', '/auth/policy', 'GET|POST')`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
