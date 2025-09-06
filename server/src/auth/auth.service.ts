import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/auth.dto';
import { Types } from 'mongoose';
import {
  EmailAlreadyExistsException,
  InvalidCredentialsException,
} from 'src/common/exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password, name, address } = createUserDto;

    // Kiểm tra email đã tồn tại
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsException(email);
    }

    // Tạo user mới
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      name,
      password: passwordHash,
      address,
    });

    // Tạo JWT token
    const token = this.jwtService.sign({ userId: user._id });

    return { user, token };
  }
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // 1. Tìm user theo email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // 2. So sánh password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // 3. Tạo JWT token (convert _id sang string)
    const payload = { sub: (user._id as Types.ObjectId).toString(), role: user.role };
    const token = this.jwtService.sign(payload);

    // 4. Trả về client (ẩn password)
    const result = user.toObject() as Record<string, any>;
    delete result.password;
    return {
      user: result,
      access_token: token,
    };
  }
}
