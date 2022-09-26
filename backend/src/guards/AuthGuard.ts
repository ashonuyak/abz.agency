import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { TokenService } from '../token/TokenService'
import { TokenExpiredException } from './exceptions'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const token = request.header('Authorization').split(' ')[1]
      await this.tokenService.verifyToken(token)
      return true
    } catch (error) {
      throw new TokenExpiredException()
    }
  }
}
