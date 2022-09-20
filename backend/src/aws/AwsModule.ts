import { Module } from '@nestjs/common'

import { AwsService } from './AwsService'

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
