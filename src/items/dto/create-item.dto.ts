import { IsInt, IsNotEmpty, IsString, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateItemDto {
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
