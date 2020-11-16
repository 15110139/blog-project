import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
	imports: [EnvironmentModule],
	providers: [ElasticsearchService],
	exports: [ElasticsearchService],
})
export class ElasticSearchModule {}
