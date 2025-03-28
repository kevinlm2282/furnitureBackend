import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Color } from './color.entity'
import { Category } from './category.entity'
import { Image } from './image.entity'
import { BaseEntity } from 'src/core/entity/base.entity'

@Entity({ name: 'items' })
@Check('quantity >= 0')
@Check('sell_price >= 0')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string

  @Column({
    type: 'int',
  })
  quantity: number

  @Column({
    name: 'sell_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  sellPrice: number

  @Column({
    name: 'fabrication_cost',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  fabricationCost: number

  @Column({
    name: 'user',
    type: 'varchar',
    length: 100,
  })
  user: string

  @ManyToOne(() => Color, { eager: true })
  @JoinColumn({ name: 'id_color' })
  color: Color

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'id_category' })
  category: Category

  @ManyToOne(() => Image, { eager: true })
  @JoinColumn({ name: 'id_image' })
  image: Image

  @BeforeInsert()
  insertStatus() {
    this.status = this.status || 1
  }

  constructor(partial: Partial<Item>) {
    super()
    Object.assign(this, partial)
  }
}
