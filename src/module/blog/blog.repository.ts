import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from 'src/database/entities/blog.entity';
import { BOOLEAN_NUMBER } from 'src/shared/business/constant';
import { FindManyOptions, Repository } from 'typeorm';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BlogRepository {
	constructor(
		@InjectRepository(BlogEntity) private repo: Repository<BlogEntity>,
	) {}
	public async create(blog: BlogEntity) {
		return await this.repo.save(blog);
	}
	public async update(
		condition: Partial<BlogEntity>,
		dataUpdate: Partial<BlogEntity>,
	) {
		await this.repo.update(condition, dataUpdate);
		return this.repo.findOne(condition);
	}

	public async get(condition: Partial<BlogEntity>) {
		return this.repo.findOne(condition);
	}

	public async find(condition: FindManyOptions<BlogEntity>) {
		return this.repo.find(condition);
	}

	public async hardDelete(condition: Partial<BlogEntity>) {
		await this.repo.delete(condition);
	}

	public async softDelete(condition: Partial<BlogEntity>) {
		await this.repo.update(condition, {
			del: BOOLEAN_NUMBER.YES,
		});
	}

	async paginate(
		options: IPaginationOptions,
		userId?: string,
	): Promise<Pagination<BlogEntity>> {
		const optionCondition: Partial<BlogEntity> = {};
		if (userId) {
			optionCondition.user_id = userId;
		}
		return paginate<BlogEntity>(this.repo, options, {
			where: {
				del: BOOLEAN_NUMBER.NO,
				...optionCondition,
			},
		});
	}
}
