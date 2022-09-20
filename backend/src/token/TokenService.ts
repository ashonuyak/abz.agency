import { Injectable, HttpException } from '@nestjs/common'
import { TokenRepository } from './TokenRepository'
import { JwtService } from '@nestjs/jwt'
import { Token } from './Token'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: TokenRepository
  ) {}

  async getToken(): Promise<string> {
    const hash = this.jwtService.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 40 })
    const token = new Token({ hash })
    await this.repository.save(token)
    return hash
  }

  async verifyToken(token: string): Promise<void> {
    const isExisted = await this.repository.findOne({ hash: token })
    if (!isExisted) {
      throw new HttpException('You are not allowed to use token more than once', 400)
    }
  }

  async deleteToken(token: string): Promise<void> {
    await this.repository.delete(token)
  }
}
