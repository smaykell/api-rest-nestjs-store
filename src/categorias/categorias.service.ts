import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorias } from './entities/categorias.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias)
    private readonly categoriasRepository: Repository<Categorias>,
  ) {}

  async findAll() {
    return await this.categoriasRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriasRepository.findOne({
      where: { id },
    });

    if (!categoria) throw new NotFoundException(`Categoria #${id} not found`);

    return categoria;
  }
}
