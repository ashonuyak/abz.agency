import { Module } from '@nestjs/common'
import { PositionController } from './PositionController'
import { PositionRepository } from './PositionRepository'
import { PositionService } from './PositionService'

@Module({
  providers: [PositionRepository, PositionService],
  controllers: [PositionController],
  exports: [PositionService],
})
export class PositionModule {}
