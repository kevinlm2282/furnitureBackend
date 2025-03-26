import { RoleCreateDto } from '../dtos/rol.create.dto'
import { Role } from '../entities/role.entity'
import { RoleRepository } from '../repositories/role.repository'

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async getRoleById(id: number) {
    return await this.roleRepository.findRoleById(id)
  }
  async createRole(roleDto: RoleCreateDto) {
    const role = new Role({ ...roleDto })
    return await this.roleRepository.createRole(role)
  }
}
