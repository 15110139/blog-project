import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';
import { PagingRequest, PagingResponse } from '../paging-interface';

export class FindBlogOfUserQueryRequest extends PagingRequest {
  constructor(page?: number, pageSize?: number) {
    super(page, pageSize);
  }
}

export class BlogItem {
  @Expose()
  @IsString()
  @IsDefined()
  public id!: string;

  @Expose()
  @IsString()
  @IsDefined()
  public title!: string;

  @Expose()
  @IsString()
  @IsDefined()
  public content!: string;

  @Expose()
  @IsString()
  @IsDefined()
  public user_id!: string;
}

export class FindBlogResponse extends PagingResponse<BlogItem> {
  constructor(
    data: BlogItem[],
    currentPage: number,
    totalItems: number,
    pageSize?: number,
  ) {
    super(data, currentPage, totalItems, pageSize);
  }
}

export class FindBlogOfUserApiInterface extends BaseApiInterface {
  public readonly url = FindBlogOfUserApiInterface.url;
  public queryDTO: FindBlogOfUserQueryRequest;
  public bodyDTO: undefined;
  public static url: string = 'user/blog';
  public readonly method = METHOD.GET;
  public responseDTOClass = FindBlogResponse;
  public paramsDTO: undefined;

  constructor(query: FindBlogOfUserQueryRequest) {
    super();
    this.queryDTO = query;
  }
}
