import { Producto } from 'src/productos/entities/productos.entity';
import { Usuario } from 'src/usuarios/entities/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalles_carrito')
export class DetallesCarrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesCarrito)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @ManyToOne(() => Usuario, (usuario) => usuario.detallesCarrito)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
