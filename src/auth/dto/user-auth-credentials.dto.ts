import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserAuthCredentialsDto {
  @ApiProperty()
  @IsString()
  readonly correo: string;

  @ApiProperty()
  @IsString()
  readonly clave: string;
}
