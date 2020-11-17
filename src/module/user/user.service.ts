import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CryptoService } from 'src/core/crypto/crypto.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { BOOLEAN_NUMBER } from '../../shared/business/constant';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	private logger = new Logger();
	constructor(
		private userRepo: UserRepository,
		private cryptoService: CryptoService,
	) {}

	public async createUser(username: string, password: string, name: string) {
		if (await this.getUserWithUserName(username)) {
			this.logger.error(`Username exist in database`);
			throw new BadRequestException(SYSTEM_CODE.USER_NAME_EXIST_SYSTEM);
		}

		const hashPassword = await this.cryptoService.hashPassword(password);

		const user = new UserEntity();
		user.name = name;
		user.username = username;
		user.password = hashPassword.finalPassword;

		await this.userRepo.create(user);
	}

	public async getUserWithUsernameAndPassword(
		username: string,
		password: string,
	): Promise<UserEntity> {
		const user = await this.getUserWithUserName(username);
		if (!user) {
			this.logger.error(`Username is not exist in database`);
			throw new BadRequestException(
				SYSTEM_CODE.USER_NAME_OR_PASSWORD_IS_NOT_CORRECT,
			);
		}
		if (!this.cryptoService.comparePassword(password, user.password)) {
			this.logger.error(`Password user is not correct`);
			throw new BadRequestException(
				SYSTEM_CODE.USER_NAME_OR_PASSWORD_IS_NOT_CORRECT,
			);
		}
		return user;
	}

	public async getUser(userId: string) {
		const user = await this.getUserById(userId);
		if (!user) {
			this.logger.error(`Username exist in database`);
			throw new BadRequestException(SYSTEM_CODE.USER_NOT_FOUND);
		}
		return user;
	}

	private async getUserWithUserName(username: string) {
		return await this.userRepo.get({
			username,
			del: BOOLEAN_NUMBER.NO,
		});
	}
	private async getUserById(userId: string) {
		return await this.userRepo.get({ id: userId, del: BOOLEAN_NUMBER.NO });
	}
}
