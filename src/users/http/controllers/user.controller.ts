import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserEntity } from '~users/entities/user.entity';
import { UserService } from '~users/services/user.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Signup API',
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDto: SignUpDto): Promise<UserEntity> {
    return this.userService.signUp(userDto);
  }

  @ApiOperation({
    description: 'Signin API',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() userDto: SignInDto): Promise<any> {
    return this.userService.signIn(userDto);
  }
}
