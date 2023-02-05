import { Producto } from 'src/productos/entities/productos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categorias')
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany((type) => Producto, (producto) => producto.categoria)
  @JoinColumn({ name: 'categoria_id' })
  productos: Producto[];
}
