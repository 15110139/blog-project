import { Global, Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EnvironmentModule } from '../environment/environment.module';

@Global()
@Module({
	imports: [EnvironmentModule],
	providers: [CryptoService],
	exports: [CryptoService],
})
export class CryptoModule {}
