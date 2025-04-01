import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CasbinRuleCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Methods can be used in that endpoint',
    example: 'GET|POST',
    type: 'string',
    title: 'Actions',
  })
  action: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Role can access the enpoint',
    example: 'ADMINISTRATOR',
    type: 'string',
    title: 'Subject',
  })
  subject: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Route of the endpoint',
    examples: ['/auth/login', '/items/:id'],
    type: 'string',
    title: 'Object',
  })
  object: string
}
