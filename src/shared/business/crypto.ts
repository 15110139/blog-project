import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CryptoKey {
	@IsString()
	@Expose()
	public privateKey: string;

	@IsString()
	@Expose()
	public publicKey: string;

	constructor(privateKey: string, publicKey: string) {
		this.privateKey = privateKey;
		this.publicKey = publicKey;
	}
}
