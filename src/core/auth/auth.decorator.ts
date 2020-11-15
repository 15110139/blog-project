import {
	createParamDecorator,
	ForbiddenException,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { JWTPayload, TOKEN_TYPE_MAP } from './auth.payload';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { TOKEN_TYPE } from 'src/shared/business/jwt-key';
import { throws } from 'src/shared/utils/throws';
import { Constructor } from 'src/@type/util';

interface IRequest<T extends JWTPayload> {
	user: T & { [key: string]: any };
}

export const JWTContent = createParamDecorator(
	<T extends JWTPayload>(
		tokenType: Constructor<T>,
		req: IRequest<JWTPayload>,
	): JWTPayload => {
		if (!tokenType) {
			throw new InternalServerErrorException(
				'Wrong token type implementation',
			);
		}
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const isSubTokenType =
			tokenType === TOKEN_TYPE_MAP[req.user.type as TOKEN_TYPE] ||
			tokenType.isPrototypeOf(
				TOKEN_TYPE_MAP[req.user.type as TOKEN_TYPE],
			);
		if (!isSubTokenType) {
			throw new ForbiddenException('Unexpected token type');
		}
		return req.user ? req.user : throws(new UnauthorizedException());
	},
);

export const OptionalJWTContent = createParamDecorator(
	(__params: any, req: IRequest<JWTPayload>): JWTPayload | undefined => {
		return req.user;
	},
);

export const JWTProperty = createParamDecorator(
	(propertyKey: string, req: IRequest<JWTPayload>): any => {
		if (!req.user || !req.user[propertyKey]) {
			throw new UnauthorizedException(SYSTEM_CODE.TOKEN_IS_INVALID);
		}
		return req.user[propertyKey];
	},
);
