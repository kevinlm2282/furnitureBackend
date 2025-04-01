import { PartialType } from '@nestjs/mapped-types'
import { CreateItemDto } from './create-item.dto'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item ID',
    example: 1,
    required: true,
  })
  id: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Item name',
    example: 'Item Name',
    required: true,
  })
  name: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Item quantity',
    example: 10,
    required: true,
  })
  quantity: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'sellPrice must be a valid number' })
  @ApiProperty({
    description: 'Item selling price',
    example: 100.5,
    required: true,
  })
  sellPrice: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'fabricationCost must be a valid number' })
  @ApiProperty({
    description: 'Item fabrication cost',
    example: 50.0,
    required: true,
  })
  fabricationCost: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Item category ID',
    example: 1,
    required: true,
  })
  categoryId: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @ApiProperty({
    description: 'Item color ID',
    example: 1,
    required: true,
  })
  colorId: number

  @IsOptional()
  @ApiProperty({
    description: 'Item image',
    required: false,
    type: 'string',
    format: 'binary',
  })
  image?: Express.Multer.File | undefined
}
