import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

export class DeleteBlogParams {
  @IsDefined()
  @Expose()
  @IsString()
  blogId!: string;
}

export class DeleteBlogApiInterface extends BaseApiInterface {
  public readonly url = DeleteBlogApiInterface.url;
  public queryDTO: undefined;
  public bodyDTO: undefined;
  public static url: string = 'blog';
  public readonly method = METHOD.DELETE;
  public responseDTOClass = null;
  public paramsDTO: DeleteBlogParams;

  constructor(params: DeleteBlogParams) {
    super();
    this.paramsDTO = params;
  }
}
