import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BOOLEAN_NUMBER } from 'src/shared/business/constant';
import { SYSTEM_CODE } from 'src/shared/business/system-code';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	private logger = new Logger();
	constructor(private userRepo: UserRepository) {}

	public async createUser(username: string, password: string) {
		if (this.getUserWithUserName(username)) {
			this.logger.error(`Username exist in database`);
			throw new BadRequestException(SYSTEM_CODE.USER_NAME_EXIST_SYSTEM);
		}
		await this.userRepo.create({
			username,
			password,
		});
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
