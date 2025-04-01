import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    example: 'admin',
    type: 'string',
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
    example: 'admin',
    type: 'string',
  })
  password: string
}
