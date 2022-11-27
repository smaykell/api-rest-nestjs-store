import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuarios.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEntity])
    ],
})
export class UsuariosModule { }
