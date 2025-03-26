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
import { RoleCreateDto } from '../dtos/rol.create.dto'
import { CasbinGuard } from '../guards/casbin.guard'
import { AuthGuard } from '../guards/auth.guard'
import { RoleUpdateDto } from '../dtos/role.update.dto'

@Controller('roles')
@UseGuards(AuthGuard, CasbinGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async createRole(@Body() roleDto: RoleCreateDto) {
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
  async updateRole(@Param('id') id: number, @Body() roleDto: RoleUpdateDto) {
    return await this.roleService.updateRole(id, roleDto)
  }
}
