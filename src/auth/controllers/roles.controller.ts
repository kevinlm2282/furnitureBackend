import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { RoleService } from '../services/role.service'
import { CreateRoleDto } from '../dtos/rol.create.dto'
import { CasbinGuard } from '../guards/casbin.guard'
import { AuthGuard } from '../guards/auth.guard'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('roles')
@UseGuards(AuthGuard, CasbinGuard)
@ApiTags('Roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Role has been successfully created',
  })
  async createRole(@Body() roleDto: CreateRoleDto) {
    return await this.roleService.createRole(roleDto)
  }

  @Get()
  async getRoles() {
    return await this.roleService.getRoles()
  }

  @Get(':id')
  async getRoleById(id: number) {
    return await this.roleService.getRoleById(id)
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() roleDto: CreateRoleDto) {
    return await this.roleService.updateRole(id, roleDto)
  }
}
