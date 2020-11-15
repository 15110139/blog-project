import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
	createCipheriv,
	createDecipheriv,
	createHash,
	pbkdf2,
	privateDecrypt,
	publicDecrypt,
	publicEncrypt,
	randomBytes,
} from 'crypto';
import { RSA_PKCS1_PADDING } from 'constants';
import { CryptoKey } from 'src/shared/business/crypto';

export const CRYPTO_KEY_GETTER_PROVIDER = Symbol('CRYPTO_KEY_GETTER_PROVIDER');

@Injectable()
export class CryptoService {
	constructor() {}

	private AES = 'aes-256-cbc';
	private publicKey!: string;
	private privateKey!: string;

	public async getRsaPublicKey(): Promise<string> {
		return (
			'-----BEGIN PUBLIC KEY-----\n' +
			this.publicKey +
			'\n-----END PUBLIC KEY-----'
		);
	}

	public async getRsaPrivateKey(): Promise<string> {
		return (
			'-----BEGIN PRIVATE KEY-----\n' +
			this.privateKey +
			'\n-----END PRIVATE KEY-----'
		);
	}

	public getTrimmedRsaPrivateKey(): string {
		return this.privateKey;
	}

	public encryptAES(buffer: Buffer, password: string): Buffer {
		const cipher = createCipheriv(
			this.AES,
			Buffer.alloc(32, password, 'utf8'),
			Buffer.alloc(16, password, 'utf8'),
		);
		return Buffer.concat([cipher.update(buffer), cipher.final()]);
	}

	public decryptAES(buffer: Buffer, password: string): Buffer {
		const decipher = createDecipheriv(
			this.AES,
			Buffer.alloc(32, password, 'utf8'),
			Buffer.alloc(16, password, 'utf8'),
		);
		return Buffer.concat([decipher.update(buffer), decipher.final()]);
	}

	public publicDecryptRsaWithCustomKey(
		buffer: Buffer,
		publicKey: string,
	): Buffer {
		return publicDecrypt(
			{
				key: publicKey,
				padding: RSA_PKCS1_PADDING,
			},
			buffer,
		);
	}

	public async privateDecryptRsa(content: Buffer): Promise<Buffer> {
		return privateDecrypt(
			{
				key: await this.getRsaPrivateKey(),
				padding: RSA_PKCS1_PADDING,
			},
			content,
		);
	}

	public async publicDecryptRsa(content: Buffer): Promise<Buffer> {
		return publicDecrypt(
			{
				key: await this.getRsaPrivateKey(),
				padding: RSA_PKCS1_PADDING,
			},
			content,
		);
	}

	public async encryptPublicRsa(content: Buffer): Promise<Buffer> {
		return publicEncrypt(
			{
				key: await this.getRsaPublicKey(),
				padding: RSA_PKCS1_PADDING,
			},
			content,
		);
	}

	public async encryptPrivateRsa(content: Buffer): Promise<Buffer> {
		return publicEncrypt(
			{
				key: await this.getRsaPrivateKey(),
				padding: RSA_PKCS1_PADDING,
			},
			content,
		);
	}

	public hashingSHA256(content: string): string {
		return createHash('sha256')
			.update(content)
			.digest('base64');
	}

	public async hashPassword(
		pwd: string,
		salt: Buffer | string = randomBytes(32),
		iterations: number = 300000,
	): Promise<{
		hash: string;
		salt: string | Buffer;
		iterations: number;
		finalPassword: string;
	}> {
		return new Promise((resolve, reject) => {
			pbkdf2(pwd, salt, iterations, 48, 'sha512', (err, derivedKey) => {
				if (err) {
					reject(err);
				} else {
					const res = {
						hash: derivedKey.toString('base64'),
						salt: salt.toString('base64'),
						iterations,
					};
					resolve({
						...res,
						finalPassword: `${res.hash}.${res.salt}.${iterations}`,
					});
				}
			});
		});
	}
}
