import { Injectable } from '@nestjs/common'
// import { CreateItemDto } from '../dto/create-item.dto'
// import { UpdateItemDto } from '../dto/update-item.dto'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { ItemRepository } from '../repositories/items.repository'
import { mapPage, Page } from 'src/core/utils/utils'
import { CreateItemDto } from '../dto/create-item.dto'
import { Item } from '../entities/item.entity'
import { ImageService } from './image.service'
import { CategoryService } from './category.service'
import { ColorService } from './color.service'

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private colorService: ColorService,
  ) {}

  async create(
    createItemDto: CreateItemDto,
    user: string,
    file: Express.Multer.File,
  ) {
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
    return mapPage([items, count])
  }

  findOne(id: number) {
    return `This action returns a #${id} item`
  }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`
  // }

  remove(id: number) {
    return `This action removes a #${id} item`
  }
}
