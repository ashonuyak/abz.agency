import { Position } from 'src/position/Position'
import { Token } from 'src/token/Token'
import { User } from 'src/user/User'

export default {
  typeorm: {
    type: {
      default: 'postgres',
    },
    url: {
      format: String,
      default: 'postgres://localhost/test',
      sensitive: true,
      env: 'POSTGRES_URL',
    },
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
} as const
