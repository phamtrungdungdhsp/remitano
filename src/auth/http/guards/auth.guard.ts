import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken } from '~core/helpers/jwt.helper';
import { UserService } from '~users/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.header('Authorization');

    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    const { isValid, data } = verifyToken(bearerToken.replace('Bearer ', ''));
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findById(data.id);
    request.user = user;
    return true;
  }
}
