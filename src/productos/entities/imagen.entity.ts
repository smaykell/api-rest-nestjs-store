import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producto } from './productos.entity';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  url: string;

  @ManyToOne(() => Producto, (producto) => producto.imagenes)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}
