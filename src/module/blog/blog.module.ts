import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticSearchModule } from 'src/core/elasticsearch/elasticsearch.module';
import { BlogEntity } from 'src/database/entities/blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';

@Module({
	imports: [TypeOrmModule.forFeature([BlogEntity]), ElasticSearchModule],
	providers: [BlogService, BlogRepository],
	exports: [BlogService, BlogRepository],
})
export class BlogModule {}
