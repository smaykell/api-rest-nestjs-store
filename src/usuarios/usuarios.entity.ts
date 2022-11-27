import { DetallesCarritoEnity } from "src/detalles-carrito/detalles-carrito.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 50 })
    correo: string;

    @Column({ length: 50 })
    clave: string;

    @Column({ type: 'int' })
    items: number;

    @OneToMany(type => DetallesCarritoEnity, detalle => detalle.usuario)
    @JoinColumn({ name: "usuario_id" })
    detallesCarrito: DetallesCarritoEnity[];

}