import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { GENERAL_COLUMN_TABLE } from './general-column-table';

export class createUserTable1605415776431 implements MigrationInterface {
	private columns: TableColumnOptions[] = [
		{
			name: 'username',
			type: 'VARCHAR(256)',
		},
		{
			name: 'password',
			type: 'VARCHAR(256)',
		},
		{
			name: 'name',
			type: 'VARCHAR(256)',
		},
	];
	private USER_TABLE = new Table({
		name: 'user',
		columns: [...GENERAL_COLUMN_TABLE, ...this.columns],
	});

	public async up(queryRunner: QueryRunner): Promise<void> {
		if (!(await queryRunner.hasTable(this.USER_TABLE.name))) {
			await queryRunner.createTable(this.USER_TABLE);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		if (!(await queryRunner.hasTable(this.USER_TABLE.name))) {
			await queryRunner.dropTable(this.USER_TABLE);
		}
	}
}
