import { Position } from '../position/Position'
import { Repository } from '../utils'
import { getManager } from 'typeorm'

export class PositionRepository extends Repository<Position>(Position) {
  getPositions(em = getManager()): Promise<Position[]> {
    return em.createQueryBuilder(Position, 'position').orderBy('position.id', 'ASC').getMany()
  }
}
