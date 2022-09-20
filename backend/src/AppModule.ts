import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigService } from './configuration'
import { PositionModule } from './position/PositionModule'
import { TokenModule } from './token/TokenModule'
import { UserModule } from './user'

@Module({})
export class AppModule {
  static register(config: ConfigService): DynamicModule {
    return {
      module: this,
      imports: [
        TypeOrmModule.forRoot(config.get('typeorm')),
        UserModule.register(config),
        PositionModule,
        TokenModule,
      ],
    }
  }
}
