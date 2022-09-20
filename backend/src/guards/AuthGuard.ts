import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from 'src/token/TokenService'
import { TokenExpiredException } from './exceptions'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const token = request.header('Authorization').split(' ')[1]
      await this.jwtService.verify(token)
      await this.tokenService.verifyToken(token)
      return true
    } catch (error) {
      throw new TokenExpiredException()
    }
  }
}
