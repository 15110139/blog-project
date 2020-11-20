import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';
import { PagingRequest, PagingResponse } from '../paging-interface';

@Exclude()
export class SearchBlogQueryRequest extends PagingRequest {
	@Expose()
	@IsString()
	public textSearch!: string;

	@Expose()
	@IsString()
	@IsOptional()
	public sort?: string[];

	constructor(page: number = 1, pageSize: number = 10) {
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

export class SearchBlogApiInterface extends BaseApiInterface {
	public readonly url = SearchBlogApiInterface.url;
	public queryDTO: SearchBlogQueryRequest;
	public bodyDTO: undefined;
	public static url: string = 'search';
	public readonly method = METHOD.GET;
	public responseDTOClass = FindBlogResponse;
	public paramsDTO: undefined;

	constructor(query: SearchBlogQueryRequest) {
		super();
		this.queryDTO = query;
	}
}
