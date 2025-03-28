import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from '../entities/item.entity'
import { Brackets, Repository } from 'typeorm'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async createItem(item: Item) {
    await this.itemRepository.save(item)
  }

  async getItems(queryParams: QueryParamsDto): Promise<[any[], number]> {
    const { filter, page, size, order, sort } = queryParams
    const qb = this.itemRepository.createQueryBuilder('item')

    qb.select([
      'item.id as id',
      'item.name as name',
      'item.quantity as quantity',
      'item.sell_price as sellPrice',
      'item.fabrication_cost as fabricationCost',
      'color.name as color',
      'category.name as category',
      'image.uuid as imageUuid',
    ])
      .leftJoin('item.color', 'color')
      .leftJoin('item.category', 'category')
      .leftJoin('item.image', 'image')
      .where('item.status = 1')

    if (filter) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('item.name ilike :filtro ', { filtro: `%${filter}%` })
        }),
      )
    }

    qb.orderBy(sort || 'item.id', order)
      .offset((page - 1) * size)
      .limit(size)
    const items = await qb.getRawMany()
    const count = await qb.getCount()
    return [items, count]
  }

  async updateItem(id: number, item: Item) {
    const result = await this.itemRepository.update(id, item)
    return result
  }

  async deleteItem(id: number) {
    const result = await this.itemRepository.update(id, { status: 0 })
    return result
  }
}
