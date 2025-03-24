import { DataSource } from 'typeorm'
import { Role } from '../entities/role.entity'

export class RoleRepository {
  constructor(private dataSource: DataSource) {}

  roleRepository = this.dataSource.getRepository(Role)

  async createRole(role: Role): Promise<Role> {
    return await this.roleRepository.save(role)
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { name } })
  }
}
