import tinify from 'tinify'
import { v4 as uuid } from 'uuid'

import { Injectable, HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AwsService {
  static PHOTO_WIDTH = 70
  static PHOTO_HEIGHT = 70
  private readonly awsAccess: {
    service: string
    aws_access_key_id: string | undefined
    aws_secret_access_key: string | undefined
    region: string
  }

  constructor(private readonly configService: ConfigService) {
    this.awsAccess = {
      service: 's3',
      aws_access_key_id: this.configService.get('AWS_ACCESS_KEY'),
      aws_secret_access_key: this.configService.get('AWS_SECRET'),
      region: 'eu-central-1',
    }
  }

  async uploadS3(photo: string): Promise<string> {
    tinify.key = this.configService.getOrThrow('TINIFY_KEY')
    const buffer = this.getBuffer(photo)
    const source = tinify.fromBuffer(buffer)
    const resized = source.resize({
      method: 'thumb',
      width: AwsService.PHOTO_WIDTH,
      height: AwsService.PHOTO_HEIGHT,
    })

    const photoUrl = await resized
      .store({
        ...this.awsAccess,
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

  private getBuffer(photo: string): Buffer {
    return Buffer.from(Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64'))
  }
}
