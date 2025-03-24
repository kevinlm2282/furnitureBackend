import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }

  async findUserByUsername(user: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username: user } })
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user)
  }
}
