import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { CryptoModule } from './core/crypto/crypto.module';
import { EnvironmentModule } from './core/environment/environment.module';
import { typeormModule } from './database/typeorm.module';
import { BlogController } from './module/blog/blog.controller';
import { BlogModule } from './module/blog/blog.module';

@Module({
	imports: [
		CryptoModule,
		AuthModule,
		typeormModule(),
		EnvironmentModule,
		BlogModule,
	],
	controllers: [BlogController],
})
export class AppModule {}
