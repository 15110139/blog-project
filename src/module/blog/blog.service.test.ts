import { BlogEntity } from '../../database/entities/blog.entity';
import { BlogService } from './blog.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { IBlog } from '../../shared/dto/blog.dto';
import { ElasticSearchModule } from '../../core/elasticsearch/elasticsearch.module';
import { Repository } from 'typeorm';
import { SYSTEM_CODE } from '../../shared/business/system-code';
import { BOOLEAN_NUMBER } from 'src/shared/business/constant';

const mockModule = async mockBlogRepository => {
	const module: TestingModule = await Test.createTestingModule({
		imports: [ElasticSearchModule],
		providers: [
			BlogService,
			{
				provide: getRepositoryToken(BlogEntity),
				useClass: Repository,
			},
			{
				provide: BlogRepository,
				useValue: mockBlogRepository,
			},
		],
	}).compile();

	return module.get(BlogService);
};

describe('BlogService', () => {
	describe('Test function Create Blog', () => {
		const blogData = {
			title: 'Javascript',
			content: 'Javascript is very good for new developer',
			user_id: '2bdb1de4-28f5-11eb-adc1-0242ac120003',
		} as IBlog;

		test('It should be create blog success', async () => {
			const mockBlogRepository = {
				async get(_condition: Partial<BlogEntity>) {
					return null;
				},
				async create(blog: BlogEntity) {
					return blog;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			const result = await blogService.createBlog(blogData);
			expect(blogData).toEqual({
				title: result.title,
				content: result.content,
				user_id: result.user_id,
			});
		});

		test(`It should be create blog fail and throw error which system code is BLOG_TITLE_EXIST_SYSTEM,
         when blog title exist in database`, async () => {
			const mockBlogRepository = {
				async get(_condition: Partial<BlogEntity>) {
					return true;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			try {
				await blogService.createBlog(blogData);
			} catch (error) {
				expect(error.response.message).toEqual(
					SYSTEM_CODE.BLOG_TITLE_EXIST_SYSTEM,
				);
			}
		});
	});

	describe('Test function Get Blog', () => {
		const blogId = '2bdb1de4-28f5-11eb-adc1-0242ac120002';

		const blogData = {
			id: '2bdb1de4-28f5-11eb-adc1-0242ac120002',
			title: 'Javascript',
			content: 'Javascript is very good for new developer',
			user_id: '2bdb1de4-28f5-11eb-adc1-0242ac120003',
		};

		test('It should be get blog success', async () => {
			const mockBlogRepository = {
				async get(_blogId: string, _del: BOOLEAN_NUMBER) {
					return blogData;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			const result = await blogService.getBlog(blogId);
			expect(result).toEqual(blogData);
		});

		test(`It should be get blog fail and throw error which system code is BLOG_NOT_FOUND,
         when blog is not exist in database`, async () => {
			const mockBlogRepository = {
				async get(_blogId: string, _del: BOOLEAN_NUMBER) {
					return null;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			try {
				await blogService.getBlog(blogId);
			} catch (error) {
				expect(error.response.message).toEqual(
					SYSTEM_CODE.BLOG_NOT_FOUND,
				);
			}
		});
	});

	describe('Test function Delete Blog', () => {
		const blogId = '2bdb1de4-28f5-11eb-adc1-0242ac120002';
		const userId = '2bdb1de4-28f5-11eb-adc1-0242ac120003';
		const blogData = {
			id: '2bdb1de4-28f5-11eb-adc1-0242ac120002',
			title: 'Javascript',
			content: 'Javascript is very good for new developer',
			user_id: '2bdb1de4-28f5-11eb-adc1-0242ac120003',
		};

		test('It should be delete blog success', async () => {
			const mockBlogRepository = {
				async get(_blogId: string, _del: BOOLEAN_NUMBER) {
					return blogData;
				},

				async softDelete(_blogId: string) {
					return true;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			try {
				await blogService.delete(blogId, userId);
			} catch (error) {
				expect(true).toEqual(false);
			}
		});

		test(`It should be delete blog fail and throw error which system code is BLOG_NOT_FOUND,
         when blog is not exist in database`, async () => {
			const mockBlogRepository = {
				async get(_blogId: string, _del: BOOLEAN_NUMBER) {
					return null;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			try {
				await blogService.delete(blogId, userId);
			} catch (error) {
				expect(error.response.message).toEqual(
					SYSTEM_CODE.BLOG_NOT_FOUND,
				);
			}
		});

		test(`It should be delete blog fail and throw error which system code is PERMISSION_DENIED,
         when blog is not owner by user`, async () => {
			const antherUserId = '2bdb1de4-28f5-11eb-adc1-0242ac120005';
			const mockBlogRepository = {
				async get(_blogId: string, _del: BOOLEAN_NUMBER) {
					return blogData;
				},
			};

			let blogService: BlogService = await mockModule(mockBlogRepository);
			try {
				await blogService.delete(blogId, antherUserId);
			} catch (error) {
				expect(error.response.message).toEqual(
					SYSTEM_CODE.PERMISSION_DENIED,
				);
			}
		});
	});
});
