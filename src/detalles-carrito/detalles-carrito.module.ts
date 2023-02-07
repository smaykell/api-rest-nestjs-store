import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesCarrito } from './entities/detalles-carrito.entity';
import { DetallesCarritoController } from './detalles-carrito.controller';
import { DetallesCarritoService } from './detalles-carrito.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProductosModule } from 'src/productos/productos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallesCarrito]),
    AuthModule,
    ProductosModule,
    UsuariosModule,
  ],
  controllers: [DetallesCarritoController],
  providers: [DetallesCarritoService],
})
export class DetallesCarritoModule {}
