import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

export class UserSignInBodyRequest {
	@Expose()
	@IsString()
	@IsDefined()
	public username!: string;

	@Expose()
	@IsString()
	@IsDefined()
	public password!: string;
}

export class User