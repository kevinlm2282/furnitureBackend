import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    example: 1,
    required: false,
    default: 1,
  })
  page: number = 1
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Page size for pagination',
    type: Number,
    example: 10,
    required: false,
    default: 10,
  })
  size: number = 10
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search filter for items',
    type: String,
    example: 'Item Name',
    required: false,
    default: '',
  })
  filter: string
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Sort field for items',
    type: String,
    example: 'name',
    required: false,
    default: 'name',
  })
  order: 'ASC' | 'DESC' = 'DESC'
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Sort field for items',
    type: String,
    example: 'name',
    required: false,
    default: 'name',
  })
  sort: string
}
