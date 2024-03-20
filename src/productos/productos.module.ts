import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/productos.entity';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Badge } from './entities/badge.entity';
import { Imagen } from './entities/imagen.entity';
import { Marca } from './entities/marca.entity';
import { Precio } from './entities/precio.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Producto, Badge, Imagen, Marca, Precio]),
  ],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService],
})
export class ProductosModule {}
