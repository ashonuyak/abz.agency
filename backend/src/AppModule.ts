import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { PositionModule } from './position/PositionModule'
import { TokenModule } from './token/TokenModule'
import { UserModule } from './user'
import { config } from './config'
import { DatabaseConfig } from './database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UserModule,
    PositionModule,
    TokenModule,
  ],
})
export class AppModule {}
