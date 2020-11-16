import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

@Exclude()
export class CreateBlogBodyRequest {
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
export class CreateBlogResponse {
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

export class CreateBlogApiInterface extends BaseApiInterface {
	public readonly url = CreateBlogApiInterface.url;
	public queryDTO: undefined;
	public bodyDTO: CreateBlogBodyRequest;
	public static url: string = 'blog';
	public readonly method = METHOD.POST;
	public responseDTOClass = CreateBlogResponse;
	public paramsDTO: undefined;

	constructor(body: CreateBlogBodyRequest) {
		super();
		this.bodyDTO = body;
	}
}
