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
import { AuthModule } from 'src/auth/auth.module'
import { ConfigService } from '@nestjs/config'
import { S3Client } from '@aws-sdk/client-s3'
import { s3ClientFactory } from './config/s3.config'

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Image, Color, Category]),
    AuthModule,
  ],
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
    ConfigService,
    S3Client,
    {
      provide: 'S3_CLIENT',
      inject: [ConfigService],
      useFactory: s3ClientFactory,
    },
  ],
  exports: ['S3_CLIENT'],
})
export class ItemsModule {}
