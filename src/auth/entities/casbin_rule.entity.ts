import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'casbin_rule' }) // Casbin usa esta tabla por defecto
export class CasbinRule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ptype: string // 'p' para reglas de permisos, 'g' para roles

  @Column()
  v0: string // Sujeto (rol o usuario)

  @Column({ nullable: true })
  v1: string // Objeto (ruta)

  @Column({ nullable: true })
  v2: string // Acción (GET, POST, *)

  @Column({ nullable: true })
  v3: string

  @Column({ nullable: true })
  v4: string

  @Column({ nullable: true })
  v5: string
}
