import { BaseEntity } from 'src/core/entity/base.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './role.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  password: string

  @Column()
  username: string

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}
