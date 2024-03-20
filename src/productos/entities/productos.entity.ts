import { Categorias } from 'src/categorias/entities/categorias.entity';
import { DetallesCarrito } from 'src/detalles-carrito/entities/detalles-carrito.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marca } from './marca.entity';
import { Badge } from './badge.entity';
import { Imagen } from './imagen.entity';
import { Precio } from './precio.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 100 })
  descripcion: string;

  @Column({ length: 100 })
  sku: string;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @OneToMany(() => Precio, (precio) => precio.producto)
  precios: Precio[];

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rating: number;

  @ManyToOne(() => Categorias, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categorias;

  @OneToMany(() => Imagen, (imagen) => imagen.producto)
  imagenes: Imagen[];

  @ManyToMany(() => Badge, (badge) => badge.productos)
  @JoinTable({
    name: 'productos_badges',
    joinColumn: { name: 'producto_id' },
    inverseJoinColumn: { name: 'badge_id' },
  })
  badges: Badge[];

  @OneToMany(() => DetallesCarrito, (detalle) => detalle.producto)
  detallesCarrito: DetallesCarrito[];
}
