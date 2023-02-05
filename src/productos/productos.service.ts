import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
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

  private buildWhere(
    nombre: string,
    categoriaId?: number,
  ): FindOptionsWhere<Producto> {
    const findOptionsWhere: FindOptionsWhere<Producto> = {};

    if (nombre) findOptionsWhere.nombre = Like(`%${nombre}%`);

    if (categoriaId)
      findOptionsWhere.categoria = {
        id: categoriaId,
      };

    return findOptionsWhere;
  }

  async findAllPaginate({ page, limit, nombre }: FindProductosQueryDto) {
    const [result, total] = await this.productosRepository.findAndCount({
      where: this.buildWhere(nombre),
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
    const [result, total] = await this.productosRepository.findAndCount({
      where: this.buildWhere(nombre, categoriaId),
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
