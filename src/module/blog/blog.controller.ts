import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateBlogBodyRequest } from 'src/shared/api-interface/blog-api-interface/create-blog-api-interface';
import { DeleteBlogApiInterface } from 'src/shared/api-interface/blog-api-interface/delete-blog-api-interface';
import {
  FindBlogApiInterface,
  FindBlogQueryRequest,
} from 'src/shared/api-interface/blog-api-interface/find-blog-api-interface';
import {
  GetBlogApiInterface,
  GetBlogParams,
} from 'src/shared/api-interface/blog-api-interface/get-blog-api-interface';
import {
  UpdateBlogApiInterface,
  UpdateBlogBodyRequest,
  UpdateBlogParams,
} from 'src/shared/api-interface/blog-api-interface/update-blog-api-interface';
import { IBlog } from 'src/shared/dto/blog.dto';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get(FindBlogApiInterface.url)
  public async listAllBlog(@Query() query: FindBlogQueryRequest) {
    return await this.blogService.listBlog(query.page, query.pageSize);
  }

  @Get(GetBlogApiInterface.url)
  public async getBlog(@Query() params: GetBlogParams) {
    return await this.blogService.getBlog(params.blogId);
  }

  @Post(GetBlogApiInterface.url)
  public async createBlog(@Body() body: CreateBlogBodyRequest, userId: string) {
    return await this.blogService.createBlog({
      content: body.content,
      title: body.content,
      user_id: userId,
    } as IBlog);
  }

  @Put(UpdateBlogApiInterface.url)
  public async updateBlog(
    @Body() body: UpdateBlogBodyRequest,
    @Query() query: UpdateBlogParams,
    userId: string,
  ) {
    return await this.blogService.updateBlog({
      blogContent: body.content,
      blogTitle: body.title,
      userId: userId,
      blogId: query.blogId,
    });
  }

  @Delete(DeleteBlogApiInterface.url)
  public async delete(@Query() params: GetBlogParams, userId: string) {
    return await this.blogService.delete(params.blogId, userId);
  }
}
