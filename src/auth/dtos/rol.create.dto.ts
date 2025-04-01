import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    title: 'Name',
    description: 'Name of the role',
    type: 'string',
  })
  name: string
}
