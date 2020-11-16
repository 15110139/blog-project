import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

@Exclude()
export class DeleteBlogOfUserParams {
	@IsDefined()
	@Expose()
	@IsString()
	blogId!: string;
}

export class DeleteBlogOfUserApiInterface extends BaseApiInterface {
	public readonly url = DeleteBlogOfUserApiInterface.url;
	public queryDTO: undefined;
	public bodyDTO: undefined;
	public static url: string = 'user/blog/:blogId';
	public readonly method = METHOD.DELETE;
	public responseDTOClass = null;
	public paramsDTO: DeleteBlogOfUserParams;

	constructor(params: DeleteBlogOfUserParams) {
		super();
		this.paramsDTO = params;
	}
}
