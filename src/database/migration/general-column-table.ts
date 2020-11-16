import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const GENERAL_COLUMN_TABLE: TableColumnOptions[] = [
	{
		name: 'id',
		type: 'VARCHAR(64)',
		isPrimary: true,
	},
	{
		name: 'create_date',
		type: 'DATETIME',
		isNullable: true,
	},
	{
		name: 'modify_date',
		type: 'VARCHAR(64)',
		isNullable: true,
	},
	{
		name: 'del',
		type: 'INT(2)',
		isNullable: true,
	},
];
