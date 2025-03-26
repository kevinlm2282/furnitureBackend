import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserCreateDto } from '../dtos/user.create.dto'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { BaseService } from 'src/core/service/base.service'
import { PinoLogger } from 'nestjs-pino'
import { Role } from '../entities/role.entity'

@Injectable()
export class AuthService extends BaseService {
  constructor(
    logger: PinoLogger,
    private userRepository: UserRepository,
    private JWTService: JwtService,
  ) {
    super(logger)
  }

  async createUser(userDto: UserCreateDto) {
    console.log('userDto', userDto)
    const password = await bcrypt.hash(userDto.password, 10)
    userDto.password = password
    const roles: Role[] = userDto.roles.map((rol) => {
      return new Role({ ...rol })
    })
    const user = await this.userRepository.createUser(
      new User({
        username: userDto.username,
        password: userDto.password,
        roles,
      }),
    )
    return user
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findUserByUsername(username)
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findUserById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async updateUser(user: User) {
    await this.findUserById(user.id)
    return await this.userRepository.updateUser(user)
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id)
    user.status = 0
    return await this.userRepository.updateUser(user)
  }

  async login(username: string, password: string) {
    const user = await this.findUserByUsername(username)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password not match')
    }
    return {
      accessToken: this.JWTService.sign({
        id: user.id,
        role: user.roles[0].name,
      }),
    }
  }
}
