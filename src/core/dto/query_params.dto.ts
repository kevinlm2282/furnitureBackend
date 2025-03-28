import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  page: number = 1
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  size: number = 10
  @IsOptional()
  @IsString()
  filter: string
  @IsOptional()
  @IsString()
  order: 'ASC' | 'DESC' = 'DESC'
  @IsOptional()
  @IsString()
  sort: string
}
