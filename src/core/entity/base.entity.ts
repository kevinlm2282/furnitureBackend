import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @Column()
  status: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor() {}
}
