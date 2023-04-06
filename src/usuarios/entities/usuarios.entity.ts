import { DetallesCarrito } from 'src/detalles-carrito/entities/detalles-carrito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  correo: string;

  @Column({ length: 50 })
  clave: string;

  @OneToMany((type) => DetallesCarrito, (detalle) => detalle.usuario)
  @JoinColumn({ name: 'usuario_id' })
  detallesCarrito: DetallesCarrito[];
}
