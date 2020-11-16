import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, Table } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BlogEntity } from './blog.entity';

@Exclude()
@Entity('user')
export class UserEntity extends BaseEntity {
	@Expose()
	@Column()
	@IsString()
	username!: string;

	@Expose()
	@Column()
	@IsString()
	password!: string;

	@Expose()
	@Column()
	@IsString()
	name!: string;

	@OneToMany(
		() => BlogEntity,
		blog => blog.user,
		{ eager: false },
	)
	@JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
	public blogs?: Promise<BlogEntity[]>;
}
