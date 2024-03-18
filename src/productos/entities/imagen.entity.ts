import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './productos.entity';

@Entity('imagenes')
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  url: string;

  @ManyToOne(() => Producto, (producto) => producto.imagenes)
  producto: Producto;
}
