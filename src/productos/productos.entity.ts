import { CategoriasEntity } from "src/categorias/categorias.entity";
import { DetallesCarritoEnity } from "src/detalles-carrito/detalles-carrito.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("productos")
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;

    @Column({ type: 'int' })
    existencia: number;

    @Column({ length: 200 })
    imagen: string;

    @ManyToOne(type => CategoriasEntity, categoria => categoria.productos)
    @JoinColumn({ name: "categoria_id" })
    categoria: CategoriasEntity;

    @OneToMany(type => DetallesCarritoEnity, detalle => detalle.producto)
    detallesCarrito: DetallesCarritoEnity[];
}