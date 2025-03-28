import { BaseEntity } from 'src/core/entity/base.entity'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'image' })
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'original_name', type: 'varchar', length: 200 })
  originalName: string

  @Column({
    type: 'varchar',
    length: 20,
  })
  format: string

  @Column({
    type: 'varchar',
    length: 100,
  })
  uuid: string

  @BeforeInsert()
  insertStatus() {
    this.status = this.status || 1
  }

  constructor(partial: Partial<Image>) {
    super()
    Object.assign(this, partial)
  }
}
