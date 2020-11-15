import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import {
	ENVIRONMENTS,
	EnvironmentService,
} from '../environment/environment.service';
import { JWTContent } from './auth.decorator';
import { JWTPayload } from './auth.payload';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Publishes } from './publish.decorator';
import { Request } from 'express';
import { HEADER } from 'src/shared/business/http.constant';
import { RefreshJwtApiInterface } from 'src/shared/api-interface/authentication/jwt-api-interface';

@Controller()
export class AuthController {
	constructor(
		private envService: EnvironmentService,
		private authService: AuthService,
	) {}

	@Get(RefreshJwtApiInterface.url)
	@UseGuards(AuthGuard())
	@Publishes({
		[ENVIRONMENTS.PRODUCTION]: { ipWhitelist: '*' },
	})
	public async refreshJWTToken(
		@Req() req: Request,
		@JWTContent(JWTPayload) jwtPayload: JWTPayload,
	) {
		const key = req.header(HEADER.HASHING);
		if (!key) {
			throw new UnauthorizedException();
		}
		const expireTime = (jwtPayload.exp || 0) - (jwtPayload.iat || 0);

		return await this.authService.resetJWTToken(
			jwtPayload,
			key,
			expireTime > 0
				? expireTime
				: this.envService.ENVIRONMENT.TOKEN_EXPIRE,
		);
	}
}
