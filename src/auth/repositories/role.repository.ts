import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleUpdateDto } from '../dtos/role.update.dto'
import { RoleCreateDto } from '../dtos/rol.create.dto'

export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(role: RoleCreateDto): Promise<Role> {
    return await this.roleRepository.save(role)
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { name } })
  }

  async findRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { id } })
  }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find()
  }

  async updateRole(role: RoleUpdateDto) {
    return await this.roleRepository.update(role.id, role)
  }
}
