import { PipeTransform } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { UserValidationException } from '../exceptions'
import { UserSchema } from './ValidationSchemas'

export class CreateUserValidationPipe implements PipeTransform<UserDto.CreateUser> {
  public transform(value: UserDto.CreateUser): UserDto.CreateUser {
    const result = UserSchema.validate(value, { abortEarly: false })
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join(' ')
      throw new UserValidationException(errorMessages)
    }
    return value
  }
}
