import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { UserCreateDto } from '../dtos/user.create.dto'
import { AuthGuard } from '../guards/auth.guard'
import { BaseService } from 'src/core/service/base.service'
import { PinoLogger } from 'nestjs-pino'
import { Request as req } from 'express'

@Controller('auth')
export class AuthController extends BaseService {
  constructor(
    logger: PinoLogger,
    private authService: AuthService,
  ) {
    super(logger)
  }

  @Post('register')
  async createUser(@Body() userDto: UserCreateDto) {
    return await this.authService.createUser(userDto)
  }

  @Post('login')
  async login(@Body() user: UserCreateDto) {
    return await this.authService.login(user.username, user.password)
  }

  @Get()
  @UseGuards(AuthGuard)
  async findUserByUsername(@Request() req: req) {
    this.logger.info(`findUserByUsername ${JSON.stringify(req['user'])}`)
    return await this.authService.findUserByUsername('ariel')
  }
}
