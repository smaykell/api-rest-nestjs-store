import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class UpdateDetalleCarritoDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly cantidad: number;
}
