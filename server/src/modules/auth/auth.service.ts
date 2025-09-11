import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/auth.dto';
import { Types } from 'mongoose';
import {
  EmailAlreadyExistsException,
  EmailNotVerifiedException,
  InvalidCredentialsException,
} from 'src/common/exceptions/auth.exception';
import { randomBytes } from 'crypto';
import { BaseHttpException } from 'src/common/exceptions/base-http.exception';
import { ErrorCode } from 'src/enums/error-codes.enum';
import { UserDocument } from 'src/modules/users/schemas/user.schema';
import { console } from 'inspector';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/common/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Sinh Access + Refresh token
   */
  private async generateTokens(userId: string, role: string, email: string) {
    const payload = { userId, role, email }; // <-- Đây là nơi set payload

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Hash và lưu refresh token vào DB
   */
  private async updateRefreshToken(user: UserDocument, refreshToken: string) {
    console.log('user', user);
    const hashed = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashed;
    await user.save();
  }

  /**
   * Đăng ký user mới
   */
  async signup(createUserDto: CreateUserDto) {
    const { email, password, name, address, phoneNumber } = createUserDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsException(email);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailToken = randomBytes(32).toString('hex');

    const user = await this.usersService.create({
      email,
      name,
      password: passwordHash,
      address,
      phoneNumber,
      emailVerificationToken: emailToken,
      isEmailVerified: false,
    });

    await this.mailService.sendVerificationEmail(user.email, emailToken);

    return {
      message: `Đăng ký thành công . Vui lòng xác thực email ${user.email} trước khi đăng nhập.`,
    };
  }

  /**
   * Đăng nhập
   */
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new InvalidCredentialsException();

    // Ensure user is of type UserDocument
    const userDoc = user as UserDocument;

    const isPasswordValid = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordValid) throw new InvalidCredentialsException();

    if (!userDoc.isEmailVerified) throw new EmailNotVerifiedException();

    const { accessToken, refreshToken } = await this.generateTokens(
      (userDoc._id as Types.ObjectId).toString(),
      userDoc.role,
      userDoc.email,
    );

    // Không lưu refresh token vào DB, chỉ trả về để controller set cookie
    const result = user.toObject();
    result.password = '';
    delete result.refreshToken;
    result.address = [];

    return {
      user: result,
      access_token: accessToken,
      refresh_token: refreshToken, // Controller sẽ set vào HTTP-only cookie, không trả về cho client
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.findByEmailVerificationToken(token);
    if (!user) {
      throw new BaseHttpException(
        ErrorCode.BAD_REQUEST,
        'Invalid or expired verification token',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new InvalidCredentialsException();
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    const { accessToken, refreshToken: newRefresh } = await this.generateTokens(
      (user._id as Types.ObjectId).toString(),
      user.role,
      user.email,
    );

    await this.updateRefreshToken(user, newRefresh);

    return {
      access_token: accessToken,
      refresh_token: newRefresh, // sẽ set lại vào cookie ở controller
    };
  }

  async logout(userId: string) {
    console.log('Logging out userId:', userId);
    const user = await this.usersService.findById(userId);
    if (!user) throw new InvalidCredentialsException();
    return { message: 'Logged out successfully' };
  }
}
