import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	Logger,
	ServiceUnavailableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
	EnvironmentService,
	ENVIRONMENTS,
} from '../environment/environment.service';
import { KEY_ENVIRONMENT_METADATA, PublishConfig } from './publish.decorator';

const IP_PREFIX = '::ffff:';

@Injectable()
export class PublishAuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private envService: EnvironmentService,
	) {}

	private logger = new Logger(PublishAuthGuard.name);

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		if (
			this.envService.ENVIRONMENT.ENV_PUBLISH_API === ENVIRONMENTS.DEVELOP
		) {
			return true;
		}

		const request: Request = context.switchToHttp().getRequest();
		const publishConfig: PublishConfig | undefined = this.reflector.get<
			PublishConfig
		>(KEY_ENVIRONMENT_METADATA, context.getHandler());
		if (!publishConfig) {
			throw new ServiceUnavailableException(
				`API: ${request.url} does not have Publish config`,
			);
		}

		const currentConfig =
			publishConfig[this.envService.ENVIRONMENT.ENV_PUBLISH_API];

		if (
			(this.envService.ENVIRONMENT.ENV_PUBLISH_API === ENVIRONMENTS.UAT ||
				this.envService.ENVIRONMENT.ENV_PUBLISH_API ===
					ENVIRONMENTS.SIT) &&
			publishConfig[ENVIRONMENTS.PRODUCTION] !== undefined
		) {
			return true;
		}

		if (!currentConfig) {
			throw new ServiceUnavailableException(
				`Publish config not fount for current ENVIRONMENT.ENV_PUBLISH_API: ${this.envService.ENVIRONMENT.ENV_PUBLISH_API}for API: ${request.url}`,
			);
		}

		const ipWhiteListKey = currentConfig.ipWhitelist;

		if (!ipWhiteListKey) {
			throw new InternalServerErrorException(`Can't find ipWhiteListKey`);
		}
		if (ipWhiteListKey === '*') {
			return true;
		}
		if (
			!Object.keys(this.envService.ENVIRONMENT).includes(ipWhiteListKey)
		) {
			throw new InternalServerErrorException(
				`Can't find key ipWhiteListKey in environment`,
			);
		}

		const ipWhiteList: string[] = this.envService.ENVIRONMENT[
			ipWhiteListKey
		] as string[];
		return this.validateRequest(request, ipWhiteList);
	}

	private validateRequest(req: any, ipWhiteList: string[]): boolean {
		let ip = req.ip.replace(IP_PREFIX, '');
		if (
			this.envService.ENVIRONMENT.PROXY_IPS.includes(ip) &&
			req.headers['x-real-ip']
		) {
			ip = req.headers['x-real-ip'].replace(IP_PREFIX, '');
		}
		this.logger.log('HEADERS: ' + JSON.stringify(req.headers));
		this.logger.log('REQUEST IP: ' + req.ip);
		this.logger.log('REMOTE IP: ' + req.remoteAddress);
		this.logger.log('VALIDATE IP: ' + ip);
		this.logger.log('ALLOWS IPS: ' + ipWhiteList);
		return ipWhiteList.includes(ip);
	}
}
