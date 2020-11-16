import {
	BadGatewayException,
	BadRequestException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { ElasticsearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { BlogEntity } from 'src/database/entities/blog.entity';
import { BOOLEAN_NUMBER } from 'src/shared/business/constant';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { IBlog } from 'src/shared/dto/blog.dto';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
	private logger = new Logger(BlogService.name);
	private indexBlogSearch: string = 'search_blog';
	constructor(
		private blogRepo: BlogRepository,
		private elasticSearchService: ElasticsearchService,
	) {}

	public async createBlog(blog: IBlog): Promise<IBlog> {
		if (await this.checkTitleBlogIsExist(blog.title)) {
			this.logger.error('Exist blog title in database');
			throw new BadRequestException(SYSTEM_CODE.BLOG_TITLE_EXIST_SYSTEM);
		}

		const blogEntityData = new BlogEntity();
		blogEntityData.title = blog.title;
		blogEntityData.content = blog.content;
		blogEntityData.user_id = blog.user_id;

		const newBlog = await this.blogRepo.create(blogEntityData);
		this.elasticSearchService
			.createData(newBlog, this.indexBlogSearch)
			.then(result => {
				this.logger.log(
					`Result create data elasticsearch: ${JSON.stringify(
						result,
					)}`,
				);
			})
			.catch(error => {
				this.logger.error(error);
			});
		return newBlog as IBlog;
	}

	public async getBlog(blogId: string): Promise<IBlog> {
		const blog = this.getBlogWithId(blogId);
		if (!blog) {
			this.logger.error('Blog is not exist in database');
			throw new BadRequestException(SYSTEM_CODE.BLOG_NOT_FOUND);
		}
		return blog;
	}

	public async updateBlog(input: {
		blogId: string;
		userId: string;
		blogTitle?: string;
		blogContent?: string;
	}): Promise<IBlog> {
		const { blogId, userId, blogTitle, blogContent } = input;
		if (!!blogTitle && !!blogContent) {
			throw new BadRequestException(SYSTEM_CODE.DATA_UPDATE_BLOG_INVALID);
		}
		const blog = await this.getBlogWithId(blogId);
		if (!blog) {
			this.logger.error('Blog is not exist in database');
			throw new UnauthorizedException(SYSTEM_CODE.PERMISSION_DENIED);
		}

		if (!this.checkBlogIsOwnUser(userId, blog)) {
			this.logger.error('Blog is not owner user');
			throw new UnauthorizedException(SYSTEM_CODE.PERMISSION_DENIED);
		}

		if (blogTitle && (await this.checkTitleBlogIsExist(blogTitle))) {
			this.logger.error('Exist blog title in database');
			throw new BadGatewayException(SYSTEM_CODE.BLOG_TITLE_EXIST_SYSTEM);
		}

		const updateResult = await this.blogRepo.update(
			{ id: blogId },
			this.buildDataUpdateBlog(blogTitle, blogContent),
		);

		this.elasticSearchService
			.updateData({
				data: updateResult,
				index: this.indexBlogSearch,
				id: blogId,
			})
			.then(result => {
				this.logger.log(
					`Result update data elasticsearch: ${JSON.stringify(
						result,
					)}`,
				);
			})
			.catch(error => {
				this.logger.error(error);
			});

		return updateResult;
	}

	public async listBlog(page: number, pageSize: number, userId?: string) {
		return await this.blogRepo.paginate(
			{
				limit: pageSize,
				page,
			},
			userId,
		);
	}

	public async delete(blogId: string, userId: string) {
		const blog = await this.getBlogWithId(blogId);
		if (!blog) {
			this.logger.error('Blog is not exist in database');
			throw new BadRequestException(SYSTEM_CODE.BLOG_NOT_FOUND);
		}

		if (!this.checkBlogIsOwnUser(userId, blog)) {
			this.logger.error('Blog is not owner user');
			throw new UnauthorizedException(SYSTEM_CODE.PERMISSION_DENIED);
		}

		await this.blogRepo.softDelete({
			id: blogId,
		});

		this.elasticSearchService
			.deleteData<BlogEntity>({
				data: blog,
				id: blogId,
				index: this.indexBlogSearch,
			})
			.then(result => {
				this.logger.log(
					`Result delete data elasticsearch: ${JSON.stringify(
						result,
					)}`,
				);
			})
			.catch(error => {
				this.logger.error(error);
			});
	}

	private async checkTitleBlogIsExist(title: string): Promise<boolean> {
		const blog = await this.blogRepo.get({ title, del: BOOLEAN_NUMBER.NO });
		return !!blog;
	}

	private async getBlogWithId(blogId: string): Promise<BlogEntity> {
		return await this.blogRepo.get({
			id: blogId,
			del: BOOLEAN_NUMBER.NO,
		});
	}

	private buildDataUpdateBlog(blogTitle?: string, blogContent?: string) {
		let dataUpdate = new BlogEntity();
		if (blogContent) {
			dataUpdate.content = blogContent;
		}
		if (blogTitle) {
			dataUpdate.title = blogTitle;
		}
		return dataUpdate;
	}

	private checkBlogIsOwnUser(userId: string, blog: IBlog) {
		return userId === blog.user_id;
	}
}
