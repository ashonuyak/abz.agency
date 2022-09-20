import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from 'src/configuration'
import { TokenController } from './TokenController'
import { TokenRepository } from './TokenRepository'
import { TokenService } from './TokenService'
import { JwtModule } from '@nestjs/jwt'

@Module({})
export class TokenModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [JwtModule.register(config.get('jwt'))],
      providers: [TokenRepository, TokenService],
      controllers: [TokenController],
      exports: [TokenService],
    }
  }
}
