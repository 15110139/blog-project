import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { EnvironmentService } from '../environment/environment.service';
import { JWTPayload, TOKEN_TYPE_MAP } from './auth.payload';
import { ConstructorFunction } from 'src/@type/util';

@Injectable()
export class AuthService {
	constructor(
		public readonly jwtService: JwtService,
		private readonly envService: EnvironmentService,
	) {}
	public async signJWTToken(
		content: JWTPayload,
		expireTime: number = this.envService.ENVIRONMENT.TOKEN_EXPIRE,
	): Promise<string> {
		return this.signContent(content, expireTime);
	}

	private async signContent(
		content: JWTPayload,
		expire: number,
	): Promise<string> {
		await this.validate(content);
		return this.jwtService.sign(content, {
			audience: this.envService.ENVIRONMENT.JWT_ISSUER,
			subject: this.envService.ENVIRONMENT.JWT_ISSUER,
			issuer: this.envService.ENVIRONMENT.JWT_ISSUER,
			expiresIn: expire,
		});
	}

	public async validate(payload: JWTPayload): Promise<JWTPayload> {
		const parsedPayload = plainToClass(
			TOKEN_TYPE_MAP[payload.type] as ConstructorFunction<JWTPayload>,
			payload,
		);
		if (!(parsedPayload instanceof TOKEN_TYPE_MAP[parsedPayload.type])) {
			throw new ForbiddenException('Unexpected token type');
		}
		await validateOrReject(parsedPayload);
		return parsedPayload;
	}
}
