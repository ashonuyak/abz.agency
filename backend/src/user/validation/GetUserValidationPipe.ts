import { PipeTransform } from '@nestjs/common'
import { UserDto } from '../../dto'
import { UserValidationException } from '../exceptions'
import { GetUserSchema } from './ValidationSchemas'

export class GetUserValidationPipe implements PipeTransform<UserDto.GetUsersRequest> {
  public transform(value: UserDto.GetUsersRequest): UserDto.GetUsersRequest {
    const result = GetUserSchema.validate(value, { abortEarly: false })
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join(' ')
      throw new UserValidationException(errorMessages)
    }
    return value
  }
}
