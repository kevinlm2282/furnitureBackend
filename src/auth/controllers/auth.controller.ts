import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { UserCreateDto } from '../dtos/user.create.dto'
import { AuthGuard } from '../guards/auth.guard'
import { BaseService } from 'src/core/service/base.service'
import { PinoLogger } from 'nestjs-pino'
import { Request as req } from 'express'
import { CasbinGuard } from '../guards/casbin.guard'
import { CasbinService } from '../services/casbin.service'
import { CasbinRuleCreateDto } from '../dtos/casbin_rule.create.dto'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'

@Controller('auth')
export class AuthController extends BaseService {
  constructor(
    logger: PinoLogger,
    private authService: AuthService,
    private casbinService: CasbinService,
  ) {
    super(logger)
  }

  @Post('register')
  @UseGuards(AuthGuard, CasbinGuard)
  @HttpCode(201)
  async createUser(@Body() userDto: UserCreateDto) {
    return await this.authService.createUser(userDto)
  }

  @Post('login')
  async login(@Body() user: UserCreateDto) {
    return await this.authService.login(user.username, user.password)
  }

  @Get()
  @UseGuards(AuthGuard, CasbinGuard)
  async findUserByUsername(@Request() req: req) {
    const user = req['user'] as { id: number }
    const userEntity = await this.authService.findUserById(user.id)
    return {
      username: userEntity.username,
      id: userEntity.id,
      role: userEntity.roles[0].name,
    }
  }

  @Get('policy')
  @UseGuards(AuthGuard, CasbinGuard)
  async getPolicies(@Query() queryParams: QueryParamsDto) {
    return await this.casbinService.getPolicies(queryParams)
  }

  @Post('policy')
  @UseGuards(AuthGuard, CasbinGuard)
  async addPolicy(@Body() casbinRule: CasbinRuleCreateDto) {
    const isAdded = await this.casbinService.addPolicy(casbinRule)
    if (!isAdded) {
      throw new BadRequestException('Policy not added')
    }
    return { message: 'Policy added' }
  }

  @Put('policy')
  @UseGuards(AuthGuard, CasbinGuard)
  async updatePolicy(
    @Query() oldRule: CasbinRuleCreateDto,
    @Body() newRule: CasbinRuleCreateDto,
  ) {
    const isUpdated = await this.casbinService.updatePolicy(oldRule, newRule)
    if (!isUpdated) {
      throw new NotFoundException('Policy not found')
    }
    return { message: 'Policy updated' }
  }

  @Delete('policy')
  @UseGuards(AuthGuard, CasbinGuard)
  async removePolicy(@Query() casbinRule: CasbinRuleCreateDto) {
    return await this.casbinService.removePolicy(casbinRule)
  }
}
