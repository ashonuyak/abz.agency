import convict from 'convict'
import * as dotenv from 'dotenv'
dotenv.config()

import schema from './ConfigSchema'

export class ConfigService {
  private readonly config = convict(schema).validate()
  readonly get = this.config.get.bind(this.config)
}
