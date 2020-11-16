import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PROCESS_SIGNAL } from './constant';
import { EnvironmentProvider } from './core/environment/environment.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: true,
		logger: new Logger(),
	});
	app.useGlobalInterceptors();
	app.setGlobalPrefix(EnvironmentProvider.useValue.ENVIRONMENT.APP_BASE_URL);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidUnknownValues: true,
			forbidNonWhitelisted: true,
			exceptionFactory: error => {
				Logger.error('Validate error');
				Logger.error(error);
				return new BadRequestException(error);
			},
		}),
	);
	process.on('SIGINT', async () => {
		await app.close();
		Logger.log('Gracefully shutting down..');
		process.exit();
	});

	Logger.log(`Trying to start resource microservices`);
	app.listen(3000);
	await app.init();

	if (process.send) {
		process.send(PROCESS_SIGNAL.READY);
	}
	return app;
}

(async (): Promise<void> => {
	await bootstrap();
})();
