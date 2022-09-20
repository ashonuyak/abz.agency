import tinify from 'tinify'
import { v4 as uuid } from 'uuid'

import { Injectable, HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {}

  async uploadS3(photo: string): Promise<string> {
    tinify.key = this.configService.getOrThrow('TINIFY_KEY')
    const buffer = Buffer.from(Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64'))
    const source = tinify.fromBuffer(buffer)
    const resized = source.resize({
      method: 'thumb',
      width: 70,
      height: 70,
    })

    const photoUrl = await resized
      .store({
        service: 's3',
        aws_access_key_id: this.configService.get('AWS_ACCESS_KEY'),
        aws_secret_access_key: this.configService.get('AWS_SECRET'),
        region: 'eu-central-1',
        path: `${this.configService.get('AWS_BUCKETNAME')}/${this.configService.get(
          'AWS_FOLDER'
        )}/${uuid()}`,
      })
      .location()
    if (!photoUrl) {
      throw new HttpException('AWS is busy now', 404)
    }
    return photoUrl
  }
}
