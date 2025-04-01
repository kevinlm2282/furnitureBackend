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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

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
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({
    summary: 'Create role',
    description: 'Create role',
  })
  async createRole(@Body() roleDto: CreateRoleDto) {
    return await this.roleService.createRole(roleDto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Roles retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({
    summary: 'Get all roles',
    description: 'Get all roles',
  })
  async getRoles() {
    return await this.roleService.getRoles()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Role retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({
    summary: 'Get role by ID',
    description: 'Get role by ID',
  })
  async getRoleById(id: number) {
    return await this.roleService.getRoleById(id)
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Role has been successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({
    summary: 'Update role',
    description: 'Update role',
  })
  async updateRole(@Param('id') id: number, @Body() roleDto: CreateRoleDto) {
    return await this.roleService.updateRole(id, roleDto)
  }
}
