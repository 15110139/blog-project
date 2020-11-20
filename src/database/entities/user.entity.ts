import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
