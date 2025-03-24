import { BaseEntity } from 'src/core/entity/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
