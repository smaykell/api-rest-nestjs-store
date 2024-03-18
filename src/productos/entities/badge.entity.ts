import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './productos.entity';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  etiqueta: string;

  @Column({ length: 100 })
  color: string;

  @ManyToMany(() => Producto, (producto) => producto.badges)
  productos: Producto[];
}
