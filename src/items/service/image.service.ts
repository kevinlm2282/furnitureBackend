import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'
import { fileTypeFromBuffer } from 'file-type'
import { PinoLogger } from 'nestjs-pino'
import { Image } from '../entities/image.entity'
import { ImageRepository } from '../repositories/image.repository'

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private configService: ConfigService,
    private logger: PinoLogger,
    @Inject('S3_CLIENT')
    private s3Client: S3Client,
  ) {}

  async createImage(file: Express.Multer.File) {
    const fileType = await fileTypeFromBuffer(file.buffer)
    if (fileType?.ext !== 'jpg' && fileType?.ext !== 'png') {
      this.logger.error('Invalid file type')
      throw new BadRequestException('Invalid file type')
    }
    const uuid = randomUUID()
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME')
    const fileName = `${uuid}`

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
    await this.s3Client.send(new PutObjectCommand(params))
    const image = new Image({
      format: file.mimetype,
      uuid: uuid,
      originalName: file.originalname,
    })
    return await this.imageRepository.createImage(image)
  }

  async getSignedUrl(uuid: string): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME')
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: uuid,
    })

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 })
  }

  async deleteImage(uuid: string) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME')

    const deleteParams = {
      Bucket: bucketName,
      Key: uuid,
    }

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams))
    } catch (error) {
      throw new NotFoundException(`${error}`)
    }
  }
}
