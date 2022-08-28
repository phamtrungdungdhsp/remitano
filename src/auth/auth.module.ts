import { Module } from '@nestjs/common';
import { UserModule } from '~users/user.module';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UserModule],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
