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
import {
	CreateBlogApiInterface,
	CreateBlogBodyRequest,
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
} from 'src/shared/api-interface/blog-api-interface/get-blog-api-interface';
import {
	UpdateBlogOfUserApiInterface,
	UpdateBlogOfUserBodyRequest,
	UpdateBlogParams,
} from 'src/shared/api-interface/blog-api-interface/update-of-user-blog-api-interface';
import { IBlog } from 'src/shared/dto/blog.dto';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Get(FindBlogApiInterface.url)
	public async listAllBlog(@Query() query: FindBlogQueryRequest) {
		return await this.blogService.listBlog(query.page, query.pageSize);
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
	public async getBlog(@Param() params: GetBlogParams) {
		return await this.blogService.getBlog(params.blogId);
	}

	@UseGuards(AuthGuard())
	@Post(CreateBlogApiInterface.url)
	public async createBlog(
		@Body() body: CreateBlogBodyRequest,
		@Request() userRequestToken: UserTokenRequest,
	) {
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
	) {
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
