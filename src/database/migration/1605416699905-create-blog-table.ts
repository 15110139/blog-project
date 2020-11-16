import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { GENERAL_COLUMN_TABLE } from './general-column-table';

export class createBlogTable1605415776431 implements MigrationInterface {
	private columns: TableColumnOptions[] = [
		{
			name: 'title',
			type: 'TEXT',
		},
		{
			name: 'content',
			type: 'TEXT',
		},
		{
			name: 'user_id',
			type: 'VARCHAR(64)',
		},
	];
	private BLOG_TABLE = new Table({
		name: 'blog',
		columns: [...GENERAL_COLUMN_TABLE, ...this.columns],
		foreignKeys: [
			{
				columnNames: ['user_id'],
				referencedTableName: 'user',
				referencedColumnNames: ['id'],
			},
		],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
		if (!(await queryRunner.hasTable(this.BLOG_TABLE.name))) {
			await queryRunner.createTable(this.BLOG_TABLE);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		if (await queryRunner.hasTable(this.BLOG_TABLE.name)) {
			await queryRunner.dropTable(this.BLOG_TABLE);
		}
	}
}
