import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IBlog } from '../../shared/dto/blog.dto';
import { Column, Entity} from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
