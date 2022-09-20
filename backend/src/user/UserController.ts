import { Controller, Get, Body, Post, UseGuards, Query, Param, Headers } from '@nestjs/common'
import { UserDto } from '../dto'
import { AuthGuard } from '../guards'
import { UserService } from './UserService'
import {
  CreateUserValidationPipe,
  GetUsersValidationPipe,
  GetUserValidationPipe,
} from './validation'

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('users')
  getUsers(
    @Query(new GetUsersValidationPipe()) query: UserDto.GetUsersRequest
  ): Promise<UserDto.GetUsersResponse> {
    return this.service.getUsers(query)
  }

  @Post('users')
  @UseGuards(AuthGuard)
  createUser(
    @Body(new CreateUserValidationPipe())
    body: UserDto.CreateUser,
    @Headers() headers: { authorization: string }
  ): Promise<{ user_id: string }> {
    return this.service.create(body, headers.authorization.split(' ')[1])
  }

  @Get('users/:id')
  getUserById(
    @Param(new GetUserValidationPipe()) param: { id: string }
  ): Promise<{ user: UserDto.UserAggregated }> {
    return this.service.getUserById(param.id)
  }
}
