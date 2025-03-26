import { IsInt, IsOptional, IsString } from 'class-validator'

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  page: number = 1
  @IsOptional()
  @IsInt()
  size: number = 10
  @IsOptional()
  @IsString()
  filter: string
  @IsOptional()
  @IsString()
  order: string
  @IsOptional()
  @IsString()
  sort: string
}
