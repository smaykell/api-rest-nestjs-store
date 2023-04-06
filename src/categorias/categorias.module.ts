import { Module } from '@nestjs/common';
import { Categorias } from './entities/categorias.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Categorias]),
    ProductosModule,
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
