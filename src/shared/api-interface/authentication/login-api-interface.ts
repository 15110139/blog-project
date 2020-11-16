import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

@Exclude()
export class UserLoginBodyRequest {
	@Expose()
	@IsString()
	@IsDefined()
	@MinLength(4)
	@MaxLength(16)
	public username!: string;

	@Expose()
	@IsString()
	@IsDefined()
	@MinLength(6)
	@MaxLength(16)
	public password!: string;
}

@Exclude()
export class UserSignResponse {
	@Expose()
	@IsString()
	@IsDefined()
	public token!: string;
}

export class UserLoginApiInterface extends BaseApiInterface {
	public static url = "login";

	public readonly url: string = UserLoginApiInterface.url;
	public readonly method = METHOD.POST;
	public readonly responseDTOClass = UserSignResponse;

	public paramsDTO: undefined;
	public queryDTO: undefined;
	public bodyDTO: UserLoginBodyRequest;

	constructor(body: UserLoginBodyRequest) {
		super();
		this.bodyDTO = body;
	}
}
