import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesCarritoEnity } from './detalles-carrito.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DetallesCarritoEnity])
    ],
})
export class DetallesCarritoModule { }
