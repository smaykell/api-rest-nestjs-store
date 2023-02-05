import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/productos.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Producto])
    ],
})
export class ProductosModule { }
