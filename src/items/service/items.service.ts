import { Injectable, NotFoundException } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { mapPage, Page } from 'src/core/utils/utils'
import { CreateItemDto } from '../dto/create-item.dto'
import { UpdateItemDto } from '../dto/update-item.dto'
import { Category } from '../entities/category.entity'
import { Color } from '../entities/color.entity'
import { Image } from '../entities/image.entity'
import { Item } from '../entities/item.entity'
import { ItemRepository } from '../repositories/items.repository'
import { ItemDto, ItemSelectDto } from '../types/item.types'
import { CategoryService } from './category.service'
import { ColorService } from './color.service'
import { ImageService } from './image.service'

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private logger: PinoLogger,
  ) {}

  async create(
    createItemDto: CreateItemDto,
    user: string,
    file: Express.Multer.File,
  ) {
    this.logger.info(`file ${JSON.stringify(file)}`)
    const image = await this.imageService.createImage(file)
    const category = await this.categoryService.getCategoryById(
      createItemDto.categoryId,
    )
    const color = await this.colorService.getColorById(createItemDto.colorId)
    await this.itemRepository.createItem(
      new Item({
        ...createItemDto,
        user: user ?? 'ariel',
        image: image,
        category: category,
        color: color,
      }),
    )
  }

  async findAll(queryParams: QueryParamsDto): Promise<Page<any>> {
    const [items, count] = await this.itemRepository.getItems(queryParams)
    const mappedItems: ItemDto[] = await Promise.all(
      items.map(async (item: ItemSelectDto) => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          fabricationCost: item.fabricationcost,
          sellPrice: item.sellprice,
          color: item.color,
          category: item.category,
          imageUrl: await this.imageService.getSignedUrl(item.imageuuid),
        }
      }),
    )
    return mapPage([mappedItems, count])
  }

  async getItemById(id: number) {
    const item = await this.itemRepository.getItemById(id)
    if (!item) {
      throw new NotFoundException('Resource not found')
    }
    return {
      ...item,
      imageUrl: await this.imageService.getSignedUrl(item.image.uuid),
    }
  }

  async updateItem(
    id: number,
    updateItemDto: UpdateItemDto,
    user: string,
    file?: Express.Multer.File,
  ) {
    const item = await this.getItemById(id)
    let image: Image = item.image
    let color: Color = item.color
    let category: Category = item.category
    const lastImageId = image.uuid
    if (file) {
      image = await this.imageService.createImage(file)

      if (updateItemDto.categoryId !== item.category.id) {
        category = await this.categoryService.getCategoryById(
          updateItemDto.categoryId,
        )
      }
      if (updateItemDto.colorId !== item.color.id) {
        color = await this.colorService.getColorById(updateItemDto.colorId)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { colorId, categoryId, ...rest } = updateItemDto
      await this.itemRepository.updateItem(
        id,
        new Item({
          ...rest,
          user: user ?? 'ariel',
          image: image,
          category: category,
          color: color,
        }),
      )
      if (file) {
        this.logger.debug(`there is a file ${file.originalname}`)
        await this.imageService.deleteImage(lastImageId)
      }
    }
  }
  async deleteItem(id: number) {
    await this.getItemById(id)
    return await this.itemRepository.deleteItem(id)
  }
}
