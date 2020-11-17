import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { PagingResponse } from '../paging-interface';

@Exclude()
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

export class BlogResponse extends PagingResponse<BlogItem> {
	constructor(
		data: BlogItem[],
		currentPage: number,
		totalItems: number,
		pageSize?: number,
	) {
		super(data, currentPage, totalItems, pageSize);
	}
}
