import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { CreateRoleDto } from './rol.create.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Username',
    description: 'Username that will be used for login',
    type: 'string',
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Password',
    description: 'Password that will ne used for login',
    type: 'string',
  })
  password: string

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Role',
    description: 'Role assigned to the user',
    type: 'array',
  })
  roles: CreateRoleDto[]
}
