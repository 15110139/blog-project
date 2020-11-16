import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

export class GetBlogOfUserResponse {
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

export class GetBlogOfUserParams {
  @IsDefined()
  @Expose()
  @IsString()
  blogId!: string;
}

export class GetBlogOfUserApiInterface extends BaseApiInterface {
  public readonly url = GetBlogOfUserApiInterface.url;
  public queryDTO: undefined;
  public bodyDTO: undefined;
  public static url: string = 'user/blog';
  public readonly method = METHOD.GET;
  public responseDTOClass = GetBlogOfUserResponse;
  public paramsDTO: GetBlogOfUserParams;

  constructor(params: GetBlogOfUserParams) {
    super();
    this.paramsDTO = params;
  }
}
