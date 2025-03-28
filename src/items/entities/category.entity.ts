import { BaseEntity } from 'src/core/entity/base.entity'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 500,
  })
  description: string

  @BeforeInsert()
  insertStatus() {
    this.status = this.status || 1
  }

  constructor(partial: Partial<Category>) {
    super()
    Object.assign(this, partial)
  }
}
