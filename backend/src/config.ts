import { Position } from './position/Position'
import { Token } from './token/Token'
import { User } from './user/User'

export const config = () => ({
  api: {
    origin: process.env.API_ORIGIN,
  },
  typeorm: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [User, Position, Token],
  },
  jwt: {
    secret: {
      format: String,
      default: 'secret',
      env: 'JWT_SECRET',
    },
  },
  aws: {
    accessKey: {
      format: String,
      default: 'access_key',
      env: 'AWS_ACCESS_KEY',
    },
    secretKey: {
      format: String,
      default: 'secret_key',
      env: 'AWS_SECRET',
    },
    bucketName: {
      format: String,
      default: 'bucket_name',
      env: 'AWS_BUCKETNAME',
    },
    folder: {
      format: String,
      default: 'folder',
      env: 'AWS_FOLDER',
    },
  },
})
