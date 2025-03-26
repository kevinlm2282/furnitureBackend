import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'

export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(role: Role): Promise<Role> {
    return await this.roleRepository.save(role)
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { name } })
  }

  async findRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { id } })
  }
}
