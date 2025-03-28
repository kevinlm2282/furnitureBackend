import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Image } from '../entities/image.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ImageRepository {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createImage(image: Image) {
    return await this.imageRepository.save(image)
  }

  async getImageByUuid(uuid: string) {
    return await this.imageRepository.findOne({ where: { uuid } })
  }

  async deleteImage(id: string) {
    return await this.imageRepository.delete(id)
  }
}
