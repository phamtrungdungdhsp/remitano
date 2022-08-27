import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from '~users/services/user.service';
import { SignUpDto } from '../dtos/sign-up.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Signup API',
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: SignUpDto): Promise<void> {
    return this.userService.signUp(userDto);
  }
}
