import { PartialType } from '@nestjs/mapped-types'
import { CreateItemDto } from './create-item.dto'
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsInt()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  quantity: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'sellPrice must be a valid number' })
  sellPrice: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'fabricationCost must be a valid number' })
  fabricationCost: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  categoryId: number

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  colorId: number
}
