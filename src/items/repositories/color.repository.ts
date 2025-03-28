import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { Color } from '../entities/color.entity'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'

export class ColorRepository {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async createColor(color: Color) {
    return await this.colorRepository.save(color)
  }

  async getColors(queryParamsDto: QueryParamsDto) {
    const { filter, page, size, order, sort } = queryParamsDto
    const qb = this.colorRepository.createQueryBuilder('color')
    qb.select(['color.id', 'color.name'])
      .offset((page - 1) * size)
      .limit(size)

    if (filter) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('color.name ilike :filter', {
            filter: `%${filter}%`,
          })
        }),
      )
    }

    qb.orderBy(sort ?? 'id', order)

    return await qb.getManyAndCount()
  }

  async getColorById(id: number) {
    return await this.colorRepository.findOne({ where: { id } })
  }

  async updateColor(id: number, color: Color) {
    return await this.colorRepository.update(id, color)
  }
}
