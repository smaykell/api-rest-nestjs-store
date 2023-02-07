import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UserAuthCredentialsDto } from './dto/user-auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(
    userAuthCredentialsDto: UserAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const usuario = await this.usuariosService.findUsuarioByCorreo(
      userAuthCredentialsDto.correo,
    );

    if (!usuario || usuario.clave !== userAuthCredentialsDto.clave)
      throw new UnauthorizedException('Incorrect login credentials!');

    const payload = { correo: usuario.correo, sub: usuario.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
