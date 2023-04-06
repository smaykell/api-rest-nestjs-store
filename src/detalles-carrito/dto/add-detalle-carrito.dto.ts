import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class AddDetalleCarritoDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly cantidad: number;

  @Type(() => Number)
  @Min(1)
  readonly producto: number;
}
