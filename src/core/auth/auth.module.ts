import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [EnvironmentModule],
			useFactory: async (
				env: EnvironmentService,
			): Promise<JwtModuleOptions> => {
				return {
					secret: env.ENVIRONMENT.JWT_SECRET,
				};
			},
			inject: [EnvironmentService],
		}),
		EnvironmentModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [PassportModule, AuthService],
})
export class AuthModule {}
