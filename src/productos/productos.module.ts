import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/productos.entity';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Producto])],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService],
})
export class ProductosModule {}
