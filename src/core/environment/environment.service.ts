import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import {
	IsNumber,
	IsString,
	validateSync,
	IsEnum,
	IsArray,
} from 'class-validator';
import { Injectable, Logger, ValueProvider } from '@nestjs/common';
import { stringToList } from '../../shared/utils/class-transformer';

export enum ENVIRONMENTS {
	PRODUCTION = 'PRODUCTION',
	UAT = 'UAT',
	SIT = 'SIT',
	DEVELOP = 'DEVELOP',
}

export class Environment {
	@Expose()
	@IsEnum(ENVIRONMENTS)
	public ENV_PUBLISH_API: ENVIRONMENTS = ENVIRONMENTS.PRODUCTION

	@Expose()
	@IsString()
	public DB_HOST: string = 'localhost';

	@Expose()
	@IsNumber()
	@Type(() => Number)
	public DB_PORT: number = 5432;

	@Expose()
	@IsString()
	public DB_USER: string = 'root';

	@Expose()
	@IsString()
	public DB_PASSWORD: string = 'G6bnWqw8vKcEuD6Irdg+CA==';

	@Expose()
	@IsString()
	public DB_NAME: string = 'blog_project';

	@Expose()
	@IsNumber()
	@Type(() => Number)
	public TOKEN_LIFETIME = 30 * 24 * 60 * 60;

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public TOKEN_REFRESH_TIME_WINDOW = 30000;

	@IsString()
	@Expose()
	public MICROSERVICES: string = 'MICROSERVICES';

	@IsString()
	@Expose()
	public JWT_ISSUER: string = 'BUI_MINH_TIEN';

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public TOKEN_EXPIRE: number = 30 * 24 * 60 * 60;

	@IsArray()
	@IsString({ each: true })
	@Expose()
	@Transform(stringToList)
	public PROXY_IPS: string[] = [''];

	@IsString()
	@Expose()
	public JWT_SECRET: string = 'QwaPPccjVXVTCQ9zgfxBMGU4nBRtcAjx';

	@IsString()
	@Expose()
	public APP_BASE_URL: string = 'v1';

	@IsString()
	@Expose()
	public ELASTICSEARCH_HOST = 'http://localhost:9200';
}

@Injectable()
export class EnvironmentService {
	public readonly ENVIRONMENT: Environment;
	constructor() {
		this.ENVIRONMENT = plainToClass(
			Environment,
			{
				...new Environment(),
				...process.env,
			},
			{ excludeExtraneousValues: true },
		);
		const res = validateSync(this.ENVIRONMENT);
		if (res.length) {
			throw res;
		}
	}
}

export const EnvironmentProvider: ValueProvider<EnvironmentService> = {
	useValue: new EnvironmentService(),
	provide: EnvironmentService,
};
