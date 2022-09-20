import { Controller, Post } from '@nestjs/common'
import { TokenService } from './TokenService'

@Controller()
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Post('token')
  async getToken(): Promise<{ token: string }> {
    const token = await this.service.getToken()
    return { token }
  }
}
