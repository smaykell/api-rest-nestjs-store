import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosService } from 'src/productos/productos.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { AddDetalleCarritoDto } from './dto/add-detalle-carrito.dto';
import { UpdateDetalleCarritoDto } from './dto/update-detalle-carrito.dto';
import { DetallesCarrito } from './entities/detalles-carrito.entity';

@Injectable()
export class DetallesCarritoService {
  constructor(
    @InjectRepository(DetallesCarrito)
    private readonly carritoRepository: Repository<DetallesCarrito>,
    private readonly productosService: ProductosService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async findDetallesCarritoByUsuarioId(id: number) {
    return await this.carritoRepository.find({
      where: {
        usuario: {
          id: id,
        },
      },
      relations: ['producto'],
    });
  }

  async addDetalleCarritoByUsuarioId(
    userId: number,
    addDetalleCarrito: AddDetalleCarritoDto,
  ) {
    const usuario = await this.usuariosService.findByUsuarioId(userId);

    const producto = await this.productosService.findOne(
      addDetalleCarrito.producto,
    );

    const detallesCarrito = await this.findDetallesCarritoByUsuarioId(userId);

    const detalleCarrito = detallesCarrito.find(
      (detalle) => detalle.producto.id === producto.id,
    );

    if (detalleCarrito) {
      detalleCarrito.cantidad += addDetalleCarrito.cantidad;
      return await this.carritoRepository.save(detalleCarrito);
    } else {
      // guardar y al reponder no incluir el usuario en el detalle
      const detalleCarrito = this.carritoRepository.create({
        cantidad: addDetalleCarrito.cantidad,
        producto,
        usuario,
      });

      await this.carritoRepository.save(detalleCarrito);
      delete detalleCarrito.usuario;
      return detalleCarrito;
    }
  }

  async updateDetalleCarritoByUsuarioId(
    userId: number,
    detalleCarritoId: number,
    updateDetalleCarritoDto: UpdateDetalleCarritoDto,
  ) {

    const detalleCarrito = await this.findDetalleCarritoById(detalleCarritoId);
    const usuario = await this.usuariosService.findByUsuarioId(userId);

    if (detalleCarrito.usuario.id !== usuario.id) {
      throw new NotFoundException('Detalle de carrito no encontrado');
    }

    detalleCarrito.cantidad = updateDetalleCarritoDto.cantidad;

   await this.carritoRepository.save(detalleCarrito);

    delete detalleCarrito.usuario;
    return detalleCarrito;
  }

  async findDetalleCarritoById(id: number) {
    const detalleCarrito = await this.carritoRepository.findOne({
      where: {
        id,
      },
      relations: ['producto', 'usuario'],
    });

    if (!detalleCarrito) {
      throw new NotFoundException('Detalle de carrito no encontrado');
    }

    return detalleCarrito;
  }

  async deleteDetalleCarritoByUsuarioId(userId: number, id: number) {
    const usuario = await this.usuariosService.findByUsuarioId(userId);
    const detalleCarrito = await this.findDetalleCarritoById(id);

    if (detalleCarrito.usuario.id !== usuario.id) {
      throw new NotFoundException('Detalle de carrito no encontrado');
    }

    return await this.carritoRepository.delete(id);
  }
}
