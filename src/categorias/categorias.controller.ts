import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindProductosQueryDto } from 'src/productos/dto/find-productos-query.dto';
import { ProductosService } from 'src/productos/productos.service';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
@UseGuards(AuthGuard())
export class CategoriasController {
  constructor(
    private readonly categoriasService: CategoriasService,
    private readonly productosService: ProductosService,
  ) {}

  @Get()
  async findAll() {
    return await this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Get(':id/productos')
  async findAllByCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Query() findProductosQueryDto: FindProductosQueryDto,
  ) {
    return await this.productosService.findAllPaginateByCategoria(
      id,
      findProductosQueryDto,
    );
  }
}
