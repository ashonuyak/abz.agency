import { HttpStatus, HttpException } from '@nestjs/common'

export class UserNotFoundException extends HttpException {
  constructor() {
    super('The user with the requested identifier does not exist', HttpStatus.NOT_FOUND)
  }
}
