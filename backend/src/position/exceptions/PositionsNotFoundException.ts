import { HttpStatus, HttpException } from '@nestjs/common'

export class PositionsNotFoundException extends HttpException {
  constructor() {
    super('Positions not found', HttpStatus.NOT_FOUND)
  }
}
