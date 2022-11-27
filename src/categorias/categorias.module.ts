import { Module } from '@nestjs/common';
import { CategoriasEntity } from './categorias.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriasEntity])
  ],
})
export class CategoriasModule { }
