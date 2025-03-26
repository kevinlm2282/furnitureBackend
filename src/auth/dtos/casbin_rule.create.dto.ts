import { IsNotEmpty, IsString } from 'class-validator'

export class CasbinRuleCreateDto {
  @IsString()
  @IsNotEmpty()
  action: string

  @IsNotEmpty()
  @IsString()
  subject: string

  @IsNotEmpty()
  @IsString()
  object: string
}
