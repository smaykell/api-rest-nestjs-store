import { ProductoEntity } from "src/productos/productos.entity";
import { UsuarioEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("detalles_carrito")
export class DetallesCarritoEnity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    cantidad: number;

    @ManyToOne(type => ProductoEntity, producto => producto.detallesCarrito)
    @JoinColumn({ name: "producto_id" })
    producto: ProductoEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.detallesCarrito)
    @JoinColumn({ name: "usuario_id" })
    usuario: UsuarioEntity;

}