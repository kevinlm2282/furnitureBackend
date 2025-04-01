import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateRoleDto } from '../dtos/rol.create.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(role: CreateRoleDto): Promise<Role> {
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

  async updateRole(id: number, role: CreateRoleDto) {
    return await this.roleRepository.update(id, role)
  }
}
