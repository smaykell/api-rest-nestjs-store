import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindProductosQueryDto } from './dto/FindProductosQuery.dto';
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
    const where: FindOptionsWhere<Producto> = nombre
      ? {
          nombre: Like(`%${nombre}%`),
        }
      : {};

    const [result, total] = await this.productosRepository.findAndCount({
      where,
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
    const where: FindOptionsWhere<Producto> = nombre
      ? {
          nombre: Like(`%${nombre}%`),
        }
      : {};

    const [result, total] = await this.productosRepository.findAndCount({
      where: {
        categoria: {
          id: categoriaId,
        },
        ...where,
      },
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
