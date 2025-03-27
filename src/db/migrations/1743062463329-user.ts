import { MigrationInterface, QueryRunner } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/auth/entities/user.entity'

export class User1743062463329 implements MigrationInterface {
  name = 'User1743062463329'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const users: Partial<User>[] = [
      {
        id: 1,
        username: 'ADMIN',
        password: await bcrypt.hash('password', 10),
        status: 1,
      },
      {
        id: 2,
        username: 'USER',
        password: await bcrypt.hash('password', 10),
        status: 1,
      },
    ]

    let query: string = ''
    users.forEach((user, index) => {
      query += `(${user.id},'${user.username}','${user.password}','${user.status}')`
      if (index < users.length - 1) {
        query += ', '
      }
    })

    await queryRunner.query(
      `INSERT INTO USERS (id, username, password,status) VALUES ${query};`,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
