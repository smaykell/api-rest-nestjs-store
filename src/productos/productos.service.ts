import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindProductosQueryDto } from './dto/find-productos-query.dto';
import { Producto } from './entities/productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ) {}

  async findAll() {
    return await this.productosRepository.find();
  }

  async findAllPaginate({ page, limit, nombre }: FindProductosQueryDto) {
    const findOptionsWhere: FindOptionsWhere<Producto> = {};
    if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

    const [result, total] = await this.productosRepository.findAndCount({
      where: findOptionsWhere,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findAllPaginateByCategoria(
    categoriaId: number,
    { page, limit, nombre }: FindProductosQueryDto,
  ) {
    const findOptionsWhere: FindOptionsWhere<Producto> = {};
    if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

    if (categoriaId)
      findOptionsWhere.categoria = {
        id: categoriaId,
      };
    const [result, total] = await this.productosRepository.findAndCount({
      where: findOptionsWhere,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: number) {
    const producto = await this.productosRepository.findOne({
      where: { id },
    });

    if (!producto) throw new NotFoundException(`Producto #${id} not found`);

    return producto;
  }
}
