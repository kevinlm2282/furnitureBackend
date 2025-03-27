import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserRoles1743063356541 implements MigrationInterface {
  name = 'UserRoles1743063356541'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRole: { usersId: number; rolesId: number }[] = [
      {
        usersId: 1,
        rolesId: 1,
      },
      {
        usersId: 2,
        rolesId: 2,
      },
    ]
    let query = ''

    usersRole.forEach((userRole, index) => {
      query += `(${userRole.usersId},${userRole.usersId})`
      if (index < usersRole.length - 1) {
        query += ', '
      }
    })

    await queryRunner.query(
      `INSERT INTO user_roles ( user_id, role_id) values ${query};`,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
