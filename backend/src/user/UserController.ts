import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Patch,
  UseInterceptors,
  Query,
  Param,
  Headers,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserDto } from 'src/dto'
import { AuthGuard } from 'src/guards'
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
  @UseInterceptors(FileInterceptor('file'))
  createUser(
    @Body(new CreateUserValidationPipe()) body: UserDto.CreateUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'jpeg' || 'jpg' }),
        ],
      })
    )
    file: Express.Multer.File,
    @Headers() headers: { authorization: string }
  ): Promise<{ user_id: string }> {
    return this.service.create({ ...body, photo: file.buffer }, headers.authorization.split(' ')[1])
  }

  @Get('users/:id')
  getUserById(
    @Param(new GetUserValidationPipe()) param: { id: string }
  ): Promise<{ user: UserDto.UserAggregated }> {
    return this.service.getUserById(param.id)
  }

  @Patch('photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'jpeg' || 'jpg' }),
        ],
      })
    )
    file: Express.Multer.File
  ): void {
    console.log(file)
  }
}
