import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { CryptoModule } from './core/crypto/crypto.module';
import { ElasticSearchModule } from './core/elasticsearch/elasticsearch.module';
import { EnvironmentModule } from './core/environment/environment.module';
import { typeormModule } from './database/typeorm.module';
import { BlogController } from './module/blog/blog.controller';
import { BlogModule } from './module/blog/blog.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
@Module({
	imports: [
		ElasticSearchModule,
		CryptoModule,
		AuthModule,
		typeormModule(),
		EnvironmentModule,
		BlogModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
	controllers: [BlogController],
})
export class AppModule {}
