import { IsString } from 'class-validator';

export class UserAuthCredentialsDto {
  @IsString()
  readonly correo: string;

  @IsString()
  readonly clave: string;
}
