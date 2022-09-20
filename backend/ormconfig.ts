import { Position } from './src/position/Position'
import { User } from './src/user/User'
import { ConnectionOptions } from 'typeorm'
import { Token } from './src/token/Token'

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL ?? 'postgres://localhost/test',
  entities: [User, Position, Token],
  synchronize: true,
  migrations: ['./migrations/**/*.ts'],
  cli: {
    migrationsDir: './migrations',
  },
}

export = config
