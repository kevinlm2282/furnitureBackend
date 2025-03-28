import { BaseEntity } from 'src/core/entity/base.entity'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'color',
})
export class Color extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: '50',
  })
  name: string

  @BeforeInsert()
  insertStatus() {
    this.status = this.status || 1
  }

  constructor(partial: Partial<Color>) {
    super()
    Object.assign(this, partial)
  }
}
