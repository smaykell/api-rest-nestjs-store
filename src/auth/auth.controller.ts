import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthCredentialsDto } from './dto/user-auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userAuthCredentialsDto: UserAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(userAuthCredentialsDto);
  }
}
