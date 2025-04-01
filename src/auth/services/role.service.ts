import { CreateRoleDto } from '../dtos/rol.create.dto'
import { Role } from '../entities/role.entity'
import { RoleRepository } from '../repositories/role.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async getRoleById(id: number) {
    const user = await this.roleRepository.findRoleById(id)
    if (!user) {
      throw new NotFoundException('Role not found')
    }
    return user
  }

  async createRole(roleDto: CreateRoleDto) {
    const role = new Role({ ...roleDto })
    return await this.roleRepository.createRole(role)
  }

  async getRoles() {
    return await this.roleRepository.getRoles()
  }

  async updateRole(id: number, role: CreateRoleDto) {
    await this.getRoleById(id)
    return await this.roleRepository.updateRole(id, role)
  }
}
