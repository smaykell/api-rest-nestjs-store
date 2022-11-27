import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './productos.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductoEntity])
    ],
})
export class ProductosModule { }
