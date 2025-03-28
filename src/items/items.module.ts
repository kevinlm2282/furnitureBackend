import { Module } from '@nestjs/common'
import { ItemsController } from './controllers/items.controller'
import { ItemsService } from './service/items.service'
import { ItemRepository } from './repositories/items.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './entities/item.entity'
import { ImageService } from './service/image.service'
import { ImageRepository } from './repositories/image.repository'
import { Image } from './entities/image.entity'
import { CategoryRepository } from './repositories/category.repository'
import { CategoryService } from './service/category.service'
import { ColorRepository } from './repositories/color.repository'
import { ColorService } from './service/color.service'
import { Color } from './entities/color.entity'
import { Category } from './entities/category.entity'
import { ImageController } from './controllers/image.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Item, Image, Color, Category])],
  controllers: [ItemsController, ImageController],
  providers: [
    ItemsService,
    ItemRepository,
    ImageService,
    ImageRepository,
    CategoryRepository,
    CategoryService,
    ColorRepository,
    ColorService,
  ],
})
export class ItemsModule {}
