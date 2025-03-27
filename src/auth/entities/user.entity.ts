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

  @Column({
    nullable: false,
    type: 'varchar',
    length: 200,
  })
  password: string

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  username: string

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}
