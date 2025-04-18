import * as path from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'furniture',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [path.join(__dirname, '../init/*{.ts,.js}')],
  schema: process.env.BD_SCHEMA || 'public',
})
