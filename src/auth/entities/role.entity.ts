import { BaseEntity } from 'src/core/entity/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name: string

  constructor(partial: Partial<Role>) {
    super()

    Object.assign(this, partial)
  }
}
