import { Injectable, NotFoundException } from '@nestjs/common'
import { ColorRepository } from '../repositories/color.repository'
import { CreateColorDto } from '../dto/create-color.dto'
import { Color } from '../entities/color.entity'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { mapPage } from 'src/core/utils/utils'

@Injectable()
export class ColorService {
  constructor(private colorRepository: ColorRepository) {}

  async getColorById(id: number) {
    const color = await this.colorRepository.getColorById(id)
    if (!color) {
      throw new NotFoundException('Resource not found')
    }
    return color
  }

  async createColor(colorDto: CreateColorDto) {
    await this.colorRepository.createColor(new Color({ ...colorDto }))
  }

  async getColors(queryParams: QueryParamsDto) {
    const colors = await this.colorRepository.getColors(queryParams)
    return mapPage(colors)
  }

  async updateColors(id: number, colorDto: CreateColorDto) {
    await this.getColorById(id)
    return await this.colorRepository.updateColor(
      id,
      new Color({ ...colorDto }),
    )
  }

  async deleteColor(id: number) {
    const color = await this.getColorById(id)
    color.status = 1
    return await this.colorRepository.updateColor(id, color)
  }
}
