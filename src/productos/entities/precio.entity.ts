import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producto } from './productos.entity';

@Entity('precios')
export class Precio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ length: 50 })
  description: string;

  @ManyToOne(() => Producto, (producto) => producto.precios)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}
