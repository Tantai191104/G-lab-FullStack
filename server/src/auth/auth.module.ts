import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, // để AuthService có thể dùng UsersService
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // đặt trong .env
      signOptions: { expiresIn: '3h' }, // thời gian token hết hạn
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // để dùng JwtService bên module khác nếu cần
})
export class AuthModule {}
