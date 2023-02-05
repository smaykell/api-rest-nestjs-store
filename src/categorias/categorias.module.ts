import { Module } from '@nestjs/common';
import { Categorias } from './entities/categorias.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Categorias])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
