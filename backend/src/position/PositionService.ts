import { Injectable } from '@nestjs/common'
import { PositionRepository } from './PositionRepository'
import { PositionsNotFoundException } from './exceptions/PositionsNotFoundException'
import { Position } from '../position/Position'

@Injectable()
export class PositionService {
  constructor(private readonly repository: PositionRepository) {}

  async getPositions(): Promise<{ positions: Position[] }> {
    const positions = await this.repository.getPositions()
    if (!positions) {
      throw new PositionsNotFoundException()
    }
    return { positions }
  }
}
