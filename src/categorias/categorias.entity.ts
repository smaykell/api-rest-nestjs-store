import { ProductoEntity } from "src/productos/productos.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("categorias")
export class CategoriasEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => ProductoEntity, producto => producto.categoria)
    @JoinColumn({ name: "categoria_id" })
    productos: ProductoEntity[];

}