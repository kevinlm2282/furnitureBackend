import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryRepository } from '../repositories/category.repository'
import { CreateCategoryDto } from '../dto/create-category.dto'
import { Category } from '../entities/category.entity'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { mapPage } from 'src/core/utils/utils'

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(categoryDto: CreateCategoryDto): Promise<void> {
    const category: Category = new Category({ ...categoryDto })
    await this.categoryRepository.createCategory(category)
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.getCategoryById(id)
    if (!category) {
      throw new NotFoundException('Resource not found')
    }
    return category
  }

  async getCategories(queryParamsDto: QueryParamsDto) {
    const categories =
      await this.categoryRepository.getCategories(queryParamsDto)
    return mapPage(categories)
  }

  async updateCategory(id: number, categoryDto: CreateCategoryDto) {
    await this.getCategoryById(id)
    return await this.categoryRepository.updateCategory(
      id,
      new Category({ ...categoryDto }),
    )
  }

  async deleteCategory(id: number) {
    const category = await this.getCategoryById(id)
    category.status = 0
    return await this.categoryRepository.updateCategory(id, category)
  }
}
