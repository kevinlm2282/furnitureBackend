import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class RoleUpdateDto {
  @IsInt()
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string
}
