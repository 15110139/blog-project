import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseApiInterface, METHOD } from '../base-api-interface';

@Exclude()
export class UserSignInBodyRequest {
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

	@Expose()
	@IsString()
	@IsDefined()
	public name!: string;
}

@Exclude()
export class UserSignInResponse {}

export class UserSignInApiInterface extends BaseApiInterface {
	public static url = 'sign-in';

	public readonly url: string = UserSignInApiInterface.url;
	public readonly method = METHOD.POST;
	public readonly responseDTOClass = UserSignInResponse;

	public paramsDTO: undefined;
	public queryDTO: undefined;
	public bodyDTO: UserSignInBodyRequest;

	constructor(body: UserSignInBodyRequest) {
		super();
		this.bodyDTO = body;
	}
}
