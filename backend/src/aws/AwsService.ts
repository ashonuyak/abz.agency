import { TYPES } from './constants'
import tinify from 'tinify'
import { v4 as uuid } from 'uuid'

import { Inject, Injectable, HttpException } from '@nestjs/common'
import { Options } from './interfaces'

@Injectable()
export class AwsService {
  private readonly accessKey: string
  private readonly secretKey: string
  private readonly bucketName: string
  private readonly folder: string
  constructor(@Inject(TYPES.Options) { accessKey, secretKey, bucketName, folder }: Options) {
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.bucketName = bucketName
    this.folder = folder
  }

  async uploadS3(photo: Buffer): Promise<string> {
    tinify.key = 'RlrfScLBLZLFlpVbY7DJJZtVXlGvn78H'
    const source = tinify.fromBuffer(photo)
    const resized = source.resize({
      method: 'thumb',
      width: 70,
      height: 70,
    })

    const photoUrl = await resized
      .store({
        service: 's3',
        aws_access_key_id: this.accessKey,
        aws_secret_access_key: this.secretKey,
        region: 'us-west-1',
        path: `${this.bucketName}/${this.folder}/${uuid()}`,
      })
      .location()
    if (!photoUrl) {
      throw new HttpException('AWS is busy now', 404)
    }
    return photoUrl
  }
}
