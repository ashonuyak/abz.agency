import { PipeTransform } from '@nestjs/common'
import { UserDto } from '../../dto'
import { UserValidationException } from '../exceptions'
import { GetUsersSchema } from './ValidationSchemas'

export class GetUsersValidationPipe implements PipeTransform<UserDto.GetUsersRequest> {
  public transform(value: UserDto.GetUsersRequest): UserDto.GetUsersRequest {
    const result = GetUsersSchema.validate(value, { abortEarly: false })
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join(' ')
      throw new UserValidationException(errorMessages)
    }
    return value
  }
}
