import { Brackets, Repository } from 'typeorm'
import { Category } from '../entities/category.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: Category) {
    return await this.categoryRepository.save(category)
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } })
  }

  async getCategories(queryParamsDto: QueryParamsDto) {
    const { filter, page, size, order, sort } = queryParamsDto
    const qb = this.categoryRepository.createQueryBuilder('category')
    qb.select(['category.id', 'category.name', 'category.description'])
      .offset((page - 1) * size)
      .limit(size)

    if (filter) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('category.description ilike :filter ', {
            filter: `%${filter}%`,
          }).orWhere('category.name ilike :filter', {
            filter: `%${filter}%`,
          })
        }),
      )
    }

    qb.orderBy(sort ?? 'id', order)

    return await qb.getManyAndCount()
  }

  async updateCategory(id: number, category: Category) {
    return await this.categoryRepository.update(id, category)
  }
}
