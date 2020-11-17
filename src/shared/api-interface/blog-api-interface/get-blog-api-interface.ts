import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

export class GetBlogResponse {
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

export class GetBlogParams {
  @IsDefined()
  @Expose()
  @IsString()
  blogId!: string;
}

export class GetBlogApiInterface extends BaseApiInterface {
  public readonly url = GetBlogApiInterface.url;
  public queryDTO: undefined;
  public bodyDTO: undefined;
  public static url: string = 'blog';
  public readonly method = METHOD.PUT;
  public responseDTOClass = GetBlogResponse;
  public paramsDTO: GetBlogParams;

  constructor(params: GetBlogParams) {
    super();
    this.paramsDTO = params;
  }
}
