import { RoleCreateDto } from './rol.create.dto'

export interface UserCreateDto {
  username: string
  password: string
  roles: RoleCreateDto[]
}
