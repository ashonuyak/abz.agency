import { Injectable } from '@nestjs/common'
import { UserDto } from '../dto'
import { User } from './User'
import { UserRepository } from './UserRepository'
import { AwsService } from '../aws'
import { NotUnique } from '../utils/errors'
import { NotUniqueException, PageNotFoundException, UserNotFoundException } from './exceptions'
import { UserMapper } from './UserMapper'
import { TokenService } from '../token/TokenService'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly awsService: AwsService,
    private readonly mapper: UserMapper,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {}

  async create(
    dto: UserDto.CreateUser,
    token: string
  ): Promise<{ user_id: string; message: string }> {
    try {
      const photoUrl = await this.awsService.uploadS3(dto.photo)

      const { id } = await this.repository.save(new User({ ...dto, photo: photoUrl }))

      await this.tokenService.deleteToken(token)

      return { user_id: id, message: 'New user successfully registered' }
    } catch (error) {
      if (error instanceof NotUnique) {
        throw new NotUniqueException()
      }
      throw error
    }
  }

  async getUsers({
    page = 1,
    offset,
    count = 5,
  }: UserDto.GetUsersRequest): Promise<UserDto.GetUsersResponse> {
    const skip = offset ? offset : (page - 1) * count
    const users = await this.repository.getUsers(skip, count)
    const usersCount = await this.repository.getUsersCount()

    if (page > Math.ceil(usersCount / count) || (offset && offset >= usersCount)) {
      throw new PageNotFoundException()
    }
    return {
      page: offset ? Math.ceil(offset / count) + 1 : Number(page),
      total_pages: Math.ceil(usersCount / count),
      total_users: usersCount,
      count: users.length,
      links: {
        next_url: (
          offset
            ? Math.ceil(offset / count) != Math.ceil(usersCount / count) && offset < usersCount - 10
            : page != Math.ceil(usersCount / count)
        )
          ? `${this.configService.get('API_ORIGIN')}/users?page=${
              offset ? Math.ceil(offset / count) + 2 : Number(page) + 1
            }${offset ? `&offset=${Number(offset) + Number(count)}` : ''}&count=${count}`
          : null,
        prev_url: (offset ? Math.ceil(offset / count) + 1 != 1 : page != 1)
          ? `${this.configService.get('API_ORIGIN')}/users?page=${
              offset ? Math.ceil(offset / count) : page - 1
            }${offset ? `&offset=${offset - count < 0 ? 0 : offset - count}` : ''}&count=${count}`
          : null,
      },
      users: users.map((user) => this.mapper.toDto(user)),
    }
  }

  async getUserById(id: string): Promise<{ user: UserDto.UserAggregated }> {
    const user = await this.repository.getUserById(id)
    if (!user) {
      throw new UserNotFoundException()
    }
    return { user: this.mapper.toDto(user) }
  }
}
