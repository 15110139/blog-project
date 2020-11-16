import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IBlog } from 'src/shared/dto/blog.dto';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Exclude()
@Entity('blog')
export class BlogEntity extends BaseEntity implements IBlog {
	@Expose()
	@Column()
	@IsString()
	title!: string;

	@Expose()
	@Column()
	@IsString()
	content!: string;

	@Expose()
	@Column()
	@IsString()
	user_id!: string;

	@ManyToOne(() => UserEntity, { eager: false })
	@JoinColumn({ name: "user_id", referencedColumnName: "id" })
	public user?: Promise<UserEntity>;
}
