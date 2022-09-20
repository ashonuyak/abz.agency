import { Controller, Get } from '@nestjs/common'
import { Position } from 'src/position/Position'
import { PositionService } from './PositionService'

@Controller()
export class PositionController {
  constructor(private readonly service: PositionService) {}

  @Get('positions')
  getPositions(): Promise<{
    positions: Position[]
  }> {
    return this.service.getPositions()
  }
}
