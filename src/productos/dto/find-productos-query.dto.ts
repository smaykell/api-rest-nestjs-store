import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindProductosQueryDto {
  @IsNumber()
  @Min(1)
  page = 1;

  @IsNumber()
  @Min(1)
  limit = 10;

  @IsOptional()
  @IsString()
  nombre: string;
}
