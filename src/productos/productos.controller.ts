import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindProductosQueryDto } from './dto/find-productos-query.dto';
import { ProductosService } from './productos.service';

@UseGuards(AuthGuard())
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll(@Query() findProductosQueryDto: FindProductosQueryDto) {
    return await this.productosService.findAllPaginate(findProductosQueryDto);
  }
}
