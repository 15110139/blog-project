import { Module } from '@nestjs/common';
import { EnvironmentProvider, EnvironmentService } from './environment.service';

@Module({
  providers: [EnvironmentProvider],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
