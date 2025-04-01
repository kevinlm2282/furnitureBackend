import { MigrationInterface, QueryRunner } from 'typeorm'

export class Roles1743030094198 implements MigrationInterface {
  name = 'Roles1743030094198'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const Users = [
      {
        name: 'ADMINISTRATOR',
        status: 1,
      },
      {
        name: 'USER',
        status: 1,
      },
    ]

    let query: string = ''
    Users.forEach((user, index) => {
      query += `('${user.name}', ${user.status})`
      if (index < Users.length - 1) {
        query += `, `
      }
    })
    await queryRunner.query(
      `INSERT INTO roles (name, status) values ${query}; `,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
