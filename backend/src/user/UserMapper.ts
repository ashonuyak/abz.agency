import { Injectable } from '@nestjs/common'
import { UserDto } from 'src/dto'
import { User } from './User'

@Injectable()
export class UserMapper {
  toAggregatedDto(u: User[]): UserDto.UserAggregated[]
  toAggregatedDto(u: User | User[]): UserDto.UserAggregated[] {
    if (!Array.isArray(u)) return this.toAggregatedDto([u])
    return u.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        position: user.position.name,
        position_id: user.position.id,
        registration_timestamp: user.registration_timestamp,
        photo: user.photo,
      }
    })
  }

  toDto(u: User): UserDto.UserAggregated {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      photo: u.photo,
      position_id: u.position.id,
      position: u.position.name,
      registration_timestamp: u.registration_timestamp,
    }
  }
}
