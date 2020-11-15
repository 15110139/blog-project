import {Exclude, Expose, Transform} from "class-transformer";
import {IsString} from "class-validator";
import {filterXSS} from "xss";
import { BaseApiInterface, METHOD } from "../base-api-interface";

@Exclude()
export class SignedTokenResponse {
	@Expose()
	@Transform(filterXSS)
	@IsString()
	public hashing!: string;

	@Expose()
	@Transform(filterXSS)
	@IsString()
	public token!: string;

	constructor(token: string, hashing: string) {
		this.token = token;
		this.hashing = hashing;
	}
}


export class RefreshJwtApiInterface extends BaseApiInterface  {
	public static url = "auth/refresh-jwt";

	public readonly url: string = RefreshJwtApiInterface.url;
	public readonly method = METHOD.GET;
	public readonly responseDTOClass = SignedTokenResponse;

	public paramsDTO: undefined;
	public queryDTO: undefined;
	public bodyDTO: undefined;
}


