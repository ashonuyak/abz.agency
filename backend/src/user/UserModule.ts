import { Module } from '@nestjs/common'
import { UserController } from './UserController'
import { UserRepository } from './UserRepository'
import { UserService } from './UserService'
import { JwtModule } from '@nestjs/jwt'
import { AwsModule } from '../aws'
import { UserMapper } from './UserMapper'
import { TokenModule } from '../token/TokenModule'

@Module({
  imports: [AwsModule, JwtModule, TokenModule],
  providers: [UserRepository, UserService, UserMapper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
