import { MigrationInterface, QueryRunner } from 'typeorm'

export class Roles1743030094198 implements MigrationInterface {
  name = 'Roles1743030094198'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles (id,name, status) values (1,'ADMINISTRATOR',1 ),(2,'USER',1); `,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
