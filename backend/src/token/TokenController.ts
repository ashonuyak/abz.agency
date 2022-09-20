import { Controller, Get } from '@nestjs/common'
import { TokenService } from './TokenService'

@Controller()
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Get('token')
  async getToken(): Promise<{ token: string }> {
    const token = await this.service.getToken()
    return { token }
  }
}
