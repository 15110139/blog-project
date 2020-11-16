import {
	Body,
	Controller,
	Post,
} from '@nestjs/common';
import {
	ENVIRONMENTS,
} from '../environment/environment.service';
import { UserJWTPayload } from './auth.payload';
import { AuthService } from './auth.service';
import { Publishes } from './publish.decorator';
import { Request } from 'express';
import { RefreshJwtApiInterface } from 'src/shared/api-interface/authentication/jwt-api-interface';
import {
	UserLoginApiInterface,
	UserLoginBodyRequest,
	UserSignResponse,
} from 'src/shared/api-interface/authentication/login-api-interface';
import { ResponseApiInterface } from 'src/shared/api-interface/base-api-interface';
import { CryptoService } from '../crypto/crypto.service';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { TOKEN_TYPE, UserKey } from 'src/shared/business/jwt-key';
import { plainToClass } from 'class-transformer';
import { UserService } from 'src/module/user/user.service';
import {
	UserSignInApiInterface,
	UserSignInBodyRequest,
	UserSignInResponse,
} from 'src/shared/api-interface/authentication/sign-in-api-interface';

@Controller()
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService,
	) {}

	@Post(UserLoginApiInterface.url)
	@Publishes({
		[ENVIRONMENTS.PRODUCTION]: { ipWhitelist: '*' },
	})
	public async userLogin(
		@Body() body: UserLoginBodyRequest,
	): Promise<ResponseApiInterface<UserSignResponse>> {
		const user = await this.userService.getUserWithUsernameAndPassword(
			body.username,
			body.password,
		);

		const content: UserJWTPayload = {
			time: new Date().getTime(),
			type: TOKEN_TYPE.BASE,
			user_id: user.id,
		};

		return new ResponseApiInterface(
			{
				token: await this.authService.signJWTToken(content),
			},
			'',
			SYSTEM_CODE.SUCCESS,
		);
	}

	@Post(UserSignInApiInterface.url)
	@Publishes({
		[ENVIRONMENTS.PRODUCTION]: { ipWhitelist: '*' },
	})
	public async userSign(
		@Body() body: UserSignInBodyRequest,
	): Promise<ResponseApiInterface<UserSignInResponse>> {
		await this.userService.createUser(
			body.username,
			body.password,
			body.name,
		);
		return new ResponseApiInterface({}, '', SYSTEM_CODE.SUCCESS);
	}
}
