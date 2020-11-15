import { JwtService } from '@nestjs/jwt';
import {
	ForbiddenException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { classToPlain, plainToClass } from 'class-transformer';
import { EnvironmentService } from '../environment/environment.service';
import {
	EncryptPayload,
	JWTPayload,
	REFRESH_TOKEN,
	TOKEN_TYPE_MAP,
} from './auth.payload';
import { CryptoService } from '../crypto/crypto.service';
import { ConstructorFunction } from 'src/@type/util';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { JWTKey } from 'src/shared/business/jwt-key';

@Injectable()
export class AuthService {
	private logger = new Logger(this.constructor.name);

	constructor(
		public readonly jwtService: JwtService,
		private readonly envService: EnvironmentService,
		private readonly cryptoService: CryptoService,
	) {}

	public async resetJWTToken(
		content: JWTPayload,
		key: string,
		expireTime: number = this.envService.ENVIRONMENT.TOKEN_EXPIRE,
	): Promise<string> {
		if (!REFRESH_TOKEN.includes(content.type)) {
			this.logger.error(
				'TOKEN TYPE NOT ALLOW TO REFRESH: ' + content.type,
			);
			throw new UnauthorizedException(
				SYSTEM_CODE.TOKEN_IS_NOT_ALLOW_TO_REFRESH,
			);
		}
		if (
			content.time + this.envService.ENVIRONMENT.TOKEN_LIFETIME <
			new Date().getTime()
		) {
			this.logger.error('TOKEN EXPIRED');
			this.logger.error('TOKEN TIME: ' + content.time);
			this.logger.error(
				'TOKEN LIFETIME: ' + this.envService.ENVIRONMENT.TOKEN_LIFETIME,
			);
			throw new UnauthorizedException(
				SYSTEM_CODE.TOKEN_IS_NOT_ALLOW_TO_REFRESH,
			);
		}

		const exp = (content.exp || 0) * 1000;
		if (
			!exp ||
			new Date().getTime() <
				exp - this.envService.ENVIRONMENT.TOKEN_REFRESH_TIME_WINDOW
		) {
			throw new UnauthorizedException(
				SYSTEM_CODE.TOKEN_IS_NOT_ALLOW_TO_REFRESH,
			);
		}
		content.deleteTokenAttribute();
		return this.signJWTToken(content, key, expireTime);
	}

	public async signJWTToken(
		content: JWTPayload,
		key: JWTKey | string,
		expireTime: number = this.envService.ENVIRONMENT.TOKEN_EXPIRE,
	): Promise<string> {
		const hashKey: string =
			typeof key === 'string'
				? key
				: key.hashCode(this.cryptoService.hashingSHA256);
		return this.signContent(content, expireTime, hashKey);
	}

	private async signContent(
		content: JWTPayload,
		expire: number,
		key: string,
	): Promise<string> {
		await this.validate(content);
		const data = JSON.stringify(classToPlain(content));
		const encryptedKey = await this.cryptoService.encryptAES(
			Buffer.from(key, 'utf8'),
			this.cryptoService.getTrimmedRsaPrivateKey(),
		);
		const contentEncrypt = await this.cryptoService.encryptAES(
			Buffer.from(data, 'utf8'),
			encryptedKey.toString('base64'),
		);
		const encryptPayload: EncryptPayload = {
			data: contentEncrypt.toString('base64'),
		};
		return this.jwtService.sign(encryptPayload, {
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
