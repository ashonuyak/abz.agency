import { DynamicModule, Module } from '@nestjs/common'

import { AwsService } from './AwsService'
import { TYPES } from './constants'
import { Options } from './interfaces'

@Module({})
export class AwsModule {
  static register(options: Options): DynamicModule {
    return {
      module: this,
      providers: [
        {
          provide: TYPES.Options,
          useValue: options,
        },
        AwsService,
      ],
      exports: [AwsService],
    }
  }
}
