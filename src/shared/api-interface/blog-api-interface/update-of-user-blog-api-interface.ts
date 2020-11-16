import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

@Exclude()
export class UpdateBlogOfUserBodyRequest {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public content?: string;
}

@Exclude()
export class UpdateBlogOfUserResponse {
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
}

@Exclude()
export class UpdateBlogParams {
  @IsDefined()
  @Expose()
  @IsString()
  blogId!: string;
}

export class UpdateBlogOfUserApiInterface extends BaseApiInterface {
  public readonly url = UpdateBlogOfUserApiInterface.url;
  public queryDTO: undefined;
  public bodyDTO: UpdateBlogOfUserBodyRequest;
  public static url: string = 'user/blog/:blogId';
  public readonly method = METHOD.PUT;
  public responseDTOClass = UpdateBlogOfUserResponse;
  public paramsDTO: UpdateBlogParams;

  constructor(body: UpdateBlogOfUserBodyRequest, params: UpdateBlogParams) {
    super();
    this.bodyDTO = body;
    this.paramsDTO = params;
  }
}
