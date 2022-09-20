import { Repository } from '../utils'
import { getManager } from 'typeorm'
import { User } from './User'

export class UserRepository extends Repository<User>(User) {
  getUsers(skip: number, take: number, em = getManager()): Promise<User[]> {
    return em
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.position', 'position.id')
      .orderBy('user.registration_timestamp', 'ASC')
      .skip(skip)
      .take(take)
      .getMany()
  }

  getUsersCount(em = getManager()): Promise<number> {
    return em.createQueryBuilder(User, 'user').getCount()
  }

  getUserById(id: string, em = getManager()): Promise<User | undefined> {
    return em
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.position', 'position.id')
      .where('user.id = :id', { id })
      .getOne()
  }
}
