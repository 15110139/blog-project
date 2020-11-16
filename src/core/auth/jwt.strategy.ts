import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';
import { UserJWTPayload } from './auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(public envService: EnvironmentService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: envService.ENVIRONMENT.JWT_SECRET,
		});
	}

	async validate(payload: UserJWTPayload) {
		return payload
	}
}
