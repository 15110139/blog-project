import {
	Body,
	Controller,
	Delete,
	Get,
	Request,
	Post,
	Put,
	Query,
	UseGuards,
	Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserTokenRequest } from 'src/core/auth/auth.payload';
import { BlogEntity } from '../../database/entities/blog.entity';
import { ResponseApiInterface } from 'src/shared/api-interface/base-api-interface';
import { BlogResponse } from 'src/shared/api-interface/blog-api-interface/blog.model';
import {
	CreateBlogApiInterface,
	CreateBlogBodyRequest,
	CreateBlogResponse,
} from 'src/shared/api-interface/blog-api-interface/create-blog-api-interface';
import { DeleteBlogOfUserApiInterface } from 'src/shared/api-interface/blog-api-interface/delete-blog-of-user-api-interface';
import {
	FindBlogApiInterface,
	FindBlogQueryRequest,
} from 'src/shared/api-interface/blog-api-interface/find-blog-api-interface';
import { FindBlogOfUserApiInterface } from 'src/shared/api-interface/blog-api-interface/find-blog-of-user-api-interface';
import {
	GetBlogApiInterface,
	GetBlogParams,
	GetBlogResponse,
} from 'src/shared/api-interface/blog-api-interface/get-blog-api-interface';
import {
	SearchBlogApiInterface,
	SearchBlogQueryRequest,
} from 'src/shared/api-interface/blog-api-interface/search-blog-api-interface';
import {
	UpdateBlogOfUserApiInterface,
	UpdateBlogOfUserBodyRequest,
	UpdateBlogOfUserResponse,
	UpdateBlogParams,
} from 'src/shared/api-interface/blog-api-interface/update-of-user-blog-api-interface';
import { IBlog } from 'src/shared/dto/blog.dto';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Get(SearchBlogApiInterface.url)
	public async search(
		@Query() query: SearchBlogQueryRequest,
	): Promise<BlogResponse> {
		const result = await this.blogService.searchBlog<BlogEntity>(
			query.textSearch,
			{
				page: query.page || 1,
				pageSize: query.pageSize || 10,
			},
			query.sort,
		);

		return new BlogResponse(
			result.data,
			result.currentPage,
			result.totalItems,
			result.pageSize,
		);
	}

	@Get(FindBlogApiInterface.url)
	public async listAllBlog(
		@Query() query: FindBlogQueryRequest,
	): Promise<BlogResponse> {
		const result = await this.blogService.listBlog(
			query.page,
			query.pageSize,
		);
		return new BlogResponse(
			result.data,
			result.currentPage,
			result.totalItems,
			result.pageSize,
		);
	}

	@UseGuards(AuthGuard())
	@Get(FindBlogOfUserApiInterface.url)
	public async listAllBlogOfUser(
		@Query() query: FindBlogQueryRequest,
		@Request() userRequestToken: UserTokenRequest,
	) {
		return await this.blogService.listBlog(
			query.page,
			query.pageSize,
			userRequestToken.user.user_id,
		);
	}

	@UseGuards(AuthGuard())
	@Get(GetBlogApiInterface.url)
	public async getBlog(
		@Param() params: GetBlogParams,
	): Promise<GetBlogResponse> {
		return await this.blogService.getBlog(params.blogId);
	}

	@UseGuards(AuthGuard())
	@Post(CreateBlogApiInterface.url)
	public async createBlog(
		@Body() body: CreateBlogBodyRequest,
		@Request() userRequestToken: UserTokenRequest,
	): Promise<CreateBlogResponse> {
		return await this.blogService.createBlog({
			content: body.content,
			title: body.title,
			user_id: userRequestToken.user.user_id,
		} as IBlog);
	}

	@UseGuards(AuthGuard())
	@Put(UpdateBlogOfUserApiInterface.url)
	public async updateBlog(
		@Body() body: UpdateBlogOfUserBodyRequest,
		@Param() param: UpdateBlogParams,
		@Request() userRequestToken: UserTokenRequest,
	): Promise<UpdateBlogOfUserResponse> {
		return await this.blogService.updateBlog({
			blogContent: body.content,
			blogTitle: body.title,
			userId: userRequestToken.user.user_id,
			blogId: param.blogId,
		});
	}

	@UseGuards(AuthGuard())
	@Delete(DeleteBlogOfUserApiInterface.url)
	public async delete(
		@Param() params: GetBlogParams,
		@Request() userRequestToken: UserTokenRequest,
	) {
		return await this.blogService.delete(
			params.blogId,
			userRequestToken.user.user_id,
		);
	}
}
