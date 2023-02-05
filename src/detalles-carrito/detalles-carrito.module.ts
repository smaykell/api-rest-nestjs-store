import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesCarrito } from './entities/detalles-carrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallesCarrito])],
})
export class DetallesCarritoModule {}
