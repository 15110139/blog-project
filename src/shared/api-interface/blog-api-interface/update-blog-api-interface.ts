import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

export class UpdateBlogBodyRequest {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public content?: string;
}

export class UpdateBlogResponse {
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

export class UpdateBlogParams {
  @IsDefined()
  @Expose()
  @IsString()
  blogId!: string;
}

export class UpdateBlogApiInterface extends BaseApiInterface {
  public readonly url = UpdateBlogApiInterface.url;
  public queryDTO: undefined;
  public bodyDTO: UpdateBlogBodyRequest;
  public static url: string = 'blog';
  public readonly method = METHOD.PUT;
  public responseDTOClass = UpdateBlogResponse;
  public paramsDTO: UpdateBlogParams;

  constructor(body: UpdateBlogBodyRequest, params: UpdateBlogParams) {
    super();
    this.bodyDTO = body;
    this.paramsDTO = params;
  }
}
