import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '~auth/services/auth.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Signing up API',
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: SignUpDto) {
    return this.authService.signUp(userDto);
  }

  @ApiOperation({
    description: 'Signing in API',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() userDto: SignInDto) {
    return this.authService.signIn(userDto);
  }
}
