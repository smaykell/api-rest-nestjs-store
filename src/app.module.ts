import { Module } from '@nestjs/common';
import { CategoriasModule } from './categorias/categorias.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DetallesCarritoModule } from './detalles-carrito/detalles-carrito.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    CategoriasModule,
    ProductosModule,
    UsuariosModule,
    DetallesCarritoModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
