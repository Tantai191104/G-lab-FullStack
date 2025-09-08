import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JwtFromRequestFunction } from 'passport-jwt';
import { JwtPayload } from 'src/types/types';

// JwtStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as unknown as JwtFromRequestFunction,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'defaultSecret',
    });
  }

  validate(payload: JwtPayload) {
    console.log('JWT payload:', payload);
    return payload;
  }
}
