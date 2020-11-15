import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from 'src/database/entities/blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogService, BlogRepository],
  exports: [BlogService, BlogRepository],
})
export class BlogModule {}
