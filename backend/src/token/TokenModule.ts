import { Module } from '@nestjs/common'
import { TokenController } from './TokenController'
import { TokenRepository } from './TokenRepository'
import { TokenService } from './TokenService'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule],
  providers: [TokenRepository, TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
