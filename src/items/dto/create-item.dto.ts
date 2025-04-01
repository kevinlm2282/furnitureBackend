import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the item',
    type: String,
    example: 'Item Name',
    required: true,
  })
  name: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Quantity of the item',
    type: Number,
    example: 10,
    required: true,
  })
  quantity: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'sellPrice must be a valid number' })
  @ApiProperty({
    description: 'Selling price of the item',
    type: Number,
    example: 100.0,
    required: true,
  })
  sellPrice: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'fabricationCost must be a valid number' })
  @ApiProperty({
    description: 'Fabrication cost of the item',
    type: Number,
    example: 50.0,
    required: true,
  })
  fabricationCost: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Category ID of the item',
    type: Number,
    example: 1,
    required: true,
  })
  categoryId: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Color ID of the item',
    type: Number,
    example: 1,
    required: true,
  })
  colorId: number

  @IsOptional()
  @ApiProperty({
    description: 'Image of the item',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image: Express.Multer.File
}
