import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from 'src/configuration'
import { UserController } from './UserController'
import { UserRepository } from './UserRepository'
import { UserService } from './UserService'
import { JwtModule } from '@nestjs/jwt'
import { AwsModule } from 'src/aws'
import { UserMapper } from './UserMapper'
import { TokenModule } from 'src/token/TokenModule'

@Module({})
export class UserModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [
        AwsModule.register(config.get('aws')),
        JwtModule.register(config.get('jwt')),
        TokenModule.register(config),
      ],
      providers: [UserRepository, UserService, UserMapper],
      controllers: [UserController],
      exports: [UserService],
    }
  }
}
